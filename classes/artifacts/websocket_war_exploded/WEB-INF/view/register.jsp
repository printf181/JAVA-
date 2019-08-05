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
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="renderer" content="webkit">
	<title>Register</title>

	<!-- bootstrap css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/bootstrap.min.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<!-- footer & docs css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/docs.min.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/docs.min.css" />
	<!-- flavr css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/flavr/flavr.css"/> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/flavr.css"/>

	<!-- jquery js -->
	<!-- <script src="<%=path%>/js/jquery-3.3.1.min.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
	<!-- bootstrap js -->
	<!-- <script src="<%=path%>/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<!-- flavr js -->
	<!-- <script src="<%=path%>/js/flavr/flavr.js" type="text/javascript" charset="utf-8"></script> -->
	<!-- <script src="https://websocket.nos-eastchina1.126.net/js/flavr.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://websocket.nos-eastchina1.126.net/js/flavr.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/highlight.pack.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/jquery.browser.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/livedemo.js" type="text/javascript" charset="utf-8"></script>
	<!-- custom js -->
	<script src="<%=path%>/js/register.js" type="text/javascript" charset="utf-8"></script>

	<!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
	<!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
	<!--[if lt IE 9]>
		<script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->

	<!-- Favicons -->
	<!-- <link rel="icon" href="<%=path%>/img/favicon.ico"> -->
	<link rel="icon" href="https://websocket.nos-eastchina1.126.net/favicon.ico">

	<!-- custom style -->
	<style type="text/css">
		body {
			background-color: #FFFAE8;
		}

		#loginTable>tbody>tr>td {
			border: 0px;
		}
	</style>

</head>

<body>
	<!-- 正文 -->
	<div class="container" style="text-align: center;">
		
		<!-- 顶部展示图片 -->
		<!-- <img src="<%=path%>/img/kiminonamaie.png" alt="你的名字 by 软软冰" class="img-responsive" style="display: unset; width: 500px;"> -->
		<img src="https://websocket.nos-eastchina1.126.net/kiminonamaie.png" alt="你的名字 by 软软冰" style="display: inline-block; max-width: 100%; min-width:130px;">
		<div id="alertMessage">&nbsp;</div>
		
		<!-- 注册信息表单 -->
		<table class="table" id="loginTable">
			<tr>
				<td>
					<div class="row">
						<div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
							<input class="form-control" type="text" id="userName" placeholder="请输入用户名" />
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="row">
						<div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
							<input class="form-control" type="password" id="password" placeholder="请输入密码" />
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="row">
						<div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
							<input class="form-control" type="password" id="confirmPassword" placeholder="请再次输入密码" />
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="row">
						<div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
							<button id="btnRegister" type="button" class="btn btn-block btn-success">注&emsp;&emsp;&emsp;册</button>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<a href="login.html">已有帐号, 马上登录</a>
				</td>
			</tr>
		</table>
		<!-- end of 表单 -->
		
	</div>
	<!-- end of 正文 -->

	<!-- footer -->
	<%@ include file="common/footer.jsp"%>
	<!-- end of footer -->

</body>

</html>
