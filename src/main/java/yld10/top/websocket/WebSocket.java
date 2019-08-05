package yld10.top.websocket;

import com.alibaba.fastjson.JSON;
import yld10.top.util.MyDate;
import yld10.top.websocket.model.DataPackage;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.LongAdder;

@ServerEndpoint("/websocket")
public class WebSocket {
    // 静态变量, 用来记录当前在线连接数. 应该把它设计成线程安全的
    private static LongAdder onlineCount = new LongAdder();

    // concurrent 包的线程安全 Set, 用来存放每个客户端刚建立连接时未初始化的 Session 对象
    private static CopyOnWriteArraySet<Session> sessionSet = new CopyOnWriteArraySet<Session>();

    // 存放每个在线的客户端连接信息  uid : uname
    public static ConcurrentSkipListMap<String, String> onlineUserMap = new ConcurrentSkipListMap<String, String>();

    // concurrent 包的线程安全 HashMap, 用来存放已经初始化完毕了的客户端连接(Session 对象), (键:值) = (用户 id :
    // Session)
    private static ConcurrentHashMap<String, Session> linkMap = new ConcurrentHashMap<String, Session>();

    /**
     * 连接建立成功调用的方法
     * 
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(Session session) {

        sessionSet.add(session); // 加入 set 中
        onlineCount.increment(); // 在线人数加 1
        System.out.println(onlineCount);
        System.out.println("有新连接加入！当前在线人数为 " + onlineCount.intValue());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        String uid = (String)session.getUserProperties().get("userid");
        
        if (null != uid) {
            System.out.println("\n连接关闭中...");
            System.out.println("uid: " + uid + "\nuname: " + onlineUserMap.get(uid));
            System.out.println("Bye");
            
            // 移除登录信息
            onlineUserMap.remove(uid);
            linkMap.remove(uid);
            
            updateList(); // 更新成员列表
            onlineCount.decrement(); // 在线人数减 1
            System.out.println("当前在线人数为 " + onlineCount.intValue());
        }else {
            System.out.println("清理工作发生异常");
        }
    }

    /**
     * 收到客户端消息后调用的方法
     * 
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println(message);
        // 解析数据包
        DataPackage dataPackage = JSON.parseObject(message, DataPackage.class);

        System.out.println("\n========= 来自客户端的消息 =========");
        System.out.println(dataPackage);
        System.out.println("========= 已到达消息末尾处 =========\n");

        // 初始化
        if ("init".equals(dataPackage.getType())) {
            sessionSet.remove(session); // 从未初始化 set 从移除
            // 添加新的连接或者覆盖旧的连接
            onlineUserMap.put(dataPackage.getSendUid(), dataPackage.getSendUName());
            linkMap.put(dataPackage.getSendUid(), session);
            
            // 给当前的 session 添加用户信息
            session.getUserProperties().put("userid", dataPackage.getSendUid());
            
            // 更新成员列表
            updateList();

            System.out.println("\n连接创建成功\n" + dataPackage + "\n");
            return;
        }

        // 单聊
        if ("single".equals(dataPackage.getType())) {
            linkMap.get(dataPackage.getReceUid()).getAsyncRemote().sendText(message);

            System.out.println("\n单聊消息转发成功\n" + dataPackage + "\n");
            return;
        }

        // 群发
        if ("multiple".equals(dataPackage.getType())) {
            // 广播之
            for (Session s : linkMap.values()) {
                // 不发给自己
                if (s == session) {
                    continue;
                }
                s.getAsyncRemote().sendText(message);
            }

            System.out.println("\n群发消息转发成功\n" + dataPackage + "\n");
            return;
        }

        System.out.println("\n未知来源的消息:\n " + message + "\n");
    }

    /**
     * 发生错误时调用
     * 
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("\nWebSocket 发生错误\n");
        error.printStackTrace();
    }

    /*
     * 更新成员列表
     */
    public void updateList() {
        DataPackage dataPackage = new DataPackage();

        // 获取在线用户列表
        ArrayList<HashMap<String, String>> data = new ArrayList<HashMap<String, String>>();
        for (Map.Entry<String, String> onlineUser : onlineUserMap.entrySet()) {
            HashMap<String, String> item = new HashMap<String, String>();
            item.put("userid", onlineUser.getKey());
            item.put("userName", onlineUser.getValue());
            data.add(item);
            item = null;
        }
        
        dataPackage.setType("update");
        dataPackage.setSendUid("server");
        dataPackage.setSendUName("server");
        dataPackage.setReceUid("all");
        dataPackage.setReceUName("all");
        dataPackage.setData(JSON.toJSON(data));
        dataPackage.setDateTime(MyDate.getTimeNow());

        // 广播之
        for (Session s : linkMap.values()) {
            s.getAsyncRemote().sendText(JSON.toJSONString(dataPackage));
        }

        System.out.println("\n更新成员列表\n" + JSON.toJSONString(dataPackage) + "\n");
    }
}