<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                      + path + "/";
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="renderer" content="webkit">
		<title>404</title>

		<!-- css -->
		<link rel="stylesheet" type="text/css" href="<%=path%>/js/util/dhtmlxMessage/codebase/skins/dhtmlxmessage_dhx_skyblue.css">
		
		<!-- js -->
		<!-- <script src="<%=path%>/js/jquery-3.3.1.min.js" type="text/javascript" charset="utf-8"></script> -->
		<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="<%=path%>/js/util/dhtmlxMessage/codebase/dhtmlxmessage.js"></script>
		
		<!-- custom css -->
		<style type="text/css">
			.dhtmlx_popup_controls {
					display: none;
			}
			.dhtmlx_popup_text {
					font-size: 15px;
			}
		</style>

		<!-- custom js -->
		<script type="text/javascript">
			$(function(){
					dhtmlx.message({
						type: 'alert-waring',
						text : '呜呜呜... 没找到. 正在跳转中...'
					});
					setTimeout(() => {
						$(location).attr('href', 'login.html')
					}, 1000);
			});
		</script>

</head>

<body>

</body>

</html>