package yld10.top.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/websocket?"
            + "useUnicode=true&characterEncoding=utf-8&useSSL=false";
    private static final String CLASSNAME = "com.mysql.jdbc.Driver";
    private static final String NAME = "root";
    private static final String PASS = "123456";
    private Connection conn;

    static {
        try {
            Class.forName(CLASSNAME);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private Connection getConnection() throws SQLException {
        conn = DriverManager.getConnection(URL, NAME, PASS);
        return conn;
    }

    public ResultSet executeQuery(String sql) throws SQLException {
        return getConnection().createStatement().executeQuery(sql);
    }

    public void close() throws SQLException {
        if (conn != null) {
            conn.close();
        }
    }

    public void executeUpdate(String sql) throws SQLException {
        try {
            getConnection().createStatement().executeUpdate(sql);
        } finally {
            conn.close();
        }
    }
}
