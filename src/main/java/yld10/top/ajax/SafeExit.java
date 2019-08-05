package yld10.top.ajax;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

@WebServlet("/safeexit")
public class SafeExit extends HttpServlet {
    private static final long serialVersionUID = -1713813887712485025L;

    public SafeExit() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        
        Enumeration<String> params = request.getParameterNames();
        HashMap<String, Object> data = new HashMap<String, Object>();
        
        while (params.hasMoreElements()) {
            String key = (String) params.nextElement();
            String value = (String) request.getSession().getAttribute(key);
            request.getSession().removeAttribute(key);
            System.out.println(key + ": " + value);
        }
        
        data.put("status", 1000);
        data.put("message", "安全退出");
        
        response.getWriter().print(JSON.toJSON(data));
        
        System.out.println("正确清除 session");
        System.out.println();
    }
}
