package yld10.top.uri;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/main.html")
public class MainServlet extends HttpServlet {
    private static final long serialVersionUID = -9047576632809758139L;

    public MainServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html, charset=utf-8");
	    
	    if (request.getSession().getAttribute("userid") != null) {
	        request.getRequestDispatcher("/WEB-INF/view/main.jsp").forward(request, response);
        }else {
            request.getRequestDispatcher("/WEB-INF/view/exception/IllegalAccess.jsp").forward(request, response);
        }
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}
