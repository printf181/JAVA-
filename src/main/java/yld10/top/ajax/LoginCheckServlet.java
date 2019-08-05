package yld10.top.ajax;

import com.alibaba.fastjson.JSON;
import yld10.top.util.DBUtil;
import yld10.top.util.MyDate;
import yld10.top.websocket.WebSocket;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

@WebServlet("/logincheckservlet")
public class LoginCheckServlet extends HttpServlet {
    private static final long serialVersionUID = 5036298190043082909L;

    public LoginCheckServlet() {
        super();
    }

    // servlet 是单实例多线程, 所以应该注意线程安全, 局部变量是安全的
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html, charset=utf-8");

        String uname = request.getParameter("userName");
        String password = request.getParameter("password");

        StringBuilder sql = new StringBuilder("select uid, upassword from user where uname = '");
        sql.append(uname);
        sql.append("'");

        DBUtil dbUtil = new DBUtil();
        ResultSet rs = null;
        HashMap<String, Object> data = new HashMap<String, Object>();

        try {
            rs = dbUtil.executeQuery(sql.toString());
            if (rs.next()) {
                if (WebSocket.onlineUserMap.containsKey(rs.getString(1))) {
                    data.put("status", 1001);
                    data.put("message", "帐号已在线, 请先退出后再进行登录");
                } else {
                    if (rs.getString(2).equals(password)) {
                        request.getSession().setAttribute("userid", rs.getString(1));
                        request.getSession().setAttribute("userName", uname);

                        sql.delete(0, sql.length());
                        sql.append("insert into userlogin(userid, logintime) values('");
                        sql.append(rs.getString(1));
                        sql.append("', '");
                        sql.append(MyDate.getTimeNow());
                        sql.append("')");

                        new DBUtil().executeUpdate(sql.toString());

                        data.put("status", 1000);
                        data.put("message", "登录成功, 正在跳转");
                    } else {
                        data.put("status", 1001);
                        data.put("message", "登录验证失败");
                    }
                }
            } else {
                data.put("status", 1001);
                data.put("message", "登录验证失败");
            }
        } catch (SQLException e) {
            // e.printStackTrace();
            data.put("status", 1002);
            data.put("message", "操作出现问题");
        } finally {
            try {
                dbUtil.close();
            } catch (SQLException e) {
                // e.printStackTrace();
            }
        }

        response.getWriter().print(JSON.toJSON(data));

        System.out.println("logincheckservlet");
        System.out.println("status: " + data.get("status"));
        System.out.println("message: " + data.get("message"));
        System.out.println();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }
}
