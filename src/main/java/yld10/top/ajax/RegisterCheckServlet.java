package yld10.top.ajax;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import yld10.top.util.DBUtil;
import yld10.top.util.MyDate;

@WebServlet("/registercheckservlet")
public class RegisterCheckServlet extends HttpServlet {
    private static final long serialVersionUID = -1360383482166577368L;

    public RegisterCheckServlet() {
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

        StringBuilder sql = new StringBuilder("select uid from user where uname = '");
        sql.append(uname);
        sql.append("'");

        DBUtil dbUtil = new DBUtil();
        ResultSet rs = null;
        HashMap<String, Object> data = new HashMap<String, Object>();

        try {
            rs = dbUtil.executeQuery(sql.toString());
            if (rs.next()) {
                data.put("status", 1001);
                data.put("message", "用户已存在");
            } else {
                StringBuilder uid = new StringBuilder(System.currentTimeMillis() + "");
                uid.append(uid.hashCode());
                uid.append(request.getSession().getId());
                System.out.println("uid: " + uid);

                // 准备开启事务
                Class<?> clazz = dbUtil.getClass();
                Method method = clazz.getDeclaredMethod("getConnection");
                method.setAccessible(true);
                Connection conn = (Connection) method.invoke(clazz.getDeclaredConstructor().newInstance());

                // 开启事务
                conn.setAutoCommit(false);

                // 添加用户信息
                sql.delete(0, sql.length());
                sql.append("insert into user(uid, uname, upassword, createtime, lastupdatetime) values('");
                sql.append(uid);
                sql.append("', '");
                sql.append(uname);
                sql.append("', '");
                sql.append(password);
                sql.append("', '");
                sql.append(MyDate.getTimeNow());
                sql.append("', '");
                sql.append(MyDate.getTimeNow());
                sql.append("')");

                conn.createStatement().executeUpdate(sql.toString());

                // 添加登录日志信息
                sql.delete(0, sql.length());
                sql.append("insert into userlogin(userid, logintime) values('");
                sql.append(uid);
                sql.append("', '");
                sql.append(MyDate.getTimeNow());
                sql.append("')");

                conn.createStatement().executeUpdate(sql.toString());

                // 提交事务
                conn.commit();
                // 关闭连接
                conn.close();

                request.getSession().setAttribute("userid", uid);
                request.getSession().setAttribute("userName", uname);

                data.put("status", 1000);
                data.put("message", "注册成功, 正在自动登录");
            }
        } catch (Exception e) {
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

        System.out.println("registercheckservlet");
        System.out.println("status: " + data.get("status"));
        System.out.println("message: " + data.get("message"));
        System.out.println();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

}
