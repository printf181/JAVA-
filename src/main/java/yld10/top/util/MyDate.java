package yld10.top.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class MyDate {
    private static SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    /**
     * 获取当前时间, 格式为 2018-08-14 20:09:30<br>
     * Mysql datetime 格式
     * 
     * @return 时间字符串
     */
    public static String getTimeNow() {
        return sFormat.format(new Date());
    }
}
