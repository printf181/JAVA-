package yld10.top.websocket.model;

public class DataPackage {
    private String type;
    private String sendUid;
    private String sendUName;
    private String receUid;
    private String receUName;
    private Object data;
    private String dateTime;

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getSendUid() {
        return sendUid;
    }
    public void setSendUid(String sendUid) {
        this.sendUid = sendUid;
    }
    public String getSendUName() {
        return sendUName;
    }
    public void setSendUName(String sendUName) {
        this.sendUName = sendUName;
    }
    public String getReceUid() {
        return receUid;
    }
    public void setReceUid(String receUid) {
        this.receUid = receUid;
    }
    public String getReceUName() {
        return receUName;
    }
    public void setReceUName(String receUName) {
        this.receUName = receUName;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }
    public String getDateTime() {
        return dateTime;
    }
    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
    
    @Override
    public String toString() {
        return "{\ntype: " + type + "\nsendUid: " + sendUid + "\nsendUName: " + sendUName + "\nreceUid: "
                + receUid + "\nreceUName: " + receUName + "\ndata: " + data + "\ndateTime: " + dateTime + "\n}";
    }
}
