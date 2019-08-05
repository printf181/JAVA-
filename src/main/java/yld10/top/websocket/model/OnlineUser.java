package yld10.top.websocket.model;

public class OnlineUser {
    private String userid;
    private String userName;
    
    public OnlineUser(String userid, String userName) {
        this.userid = userid;
        this.userName = userName;
    }
    
    public String getUserid() {
        return userid;
    }
    
    public String getUserName() {
        return userName;
    }
    
    @Override
    public String toString() {
        return "OnlineUser [userid=" + userid + ", userName=" + userName + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((userName == null) ? 0 : userName.hashCode());
        result = prime * result + ((userid == null) ? 0 : userid.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        OnlineUser other = (OnlineUser) obj;
        if (userName == null) {
            if (other.userName != null)
                return false;
        } else if (!userName.equals(other.userName))
            return false;
        if (userid == null) {
            if (other.userid != null)
                return false;
        } else if (!userid.equals(other.userid))
            return false;
        return true;
    }
}
