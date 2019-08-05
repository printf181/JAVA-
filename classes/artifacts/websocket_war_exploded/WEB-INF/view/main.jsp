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
	<title>聊天室</title>

	<!-- bootstrap css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/bootstrap.min.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<!-- footer & docs css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/docs.min.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/docs.min.css" />
	<!-- Tipso css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/Tipso/tipso.min.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/tipso.min.css" />
	<!-- mouseover css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/mouseover/mover.css" /> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/mover.css" />
	<!-- dhtmlx css -->
	<link rel="stylesheet" type="text/css" href="<%=path%>/js/util/dhtmlxMessage/codebase/skins/dhtmlxmessage_dhx_skyblue.css"/>
	<!-- flavr css -->
	<!-- <link rel="stylesheet" type="text/css" href="<%=path%>/css/flavr/flavr.css"/> -->
	<link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/flavr.css"/>
	<!-- custom css -->
	<link rel="stylesheet" type="text/css" href="<%=path%>/css/main.css" />
	<!-- <link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/main.css" /> -->
	<link rel="stylesheet" type="text/css" href="<%=path%>/css/chat/chat.css" />
	<!-- <link rel="stylesheet" type="text/css" href="https://websocket.nos-eastchina1.126.net/css/chat.css" /> -->
    <script></script>
	<!-- jquery js -->
	<!-- <script src="<%=path%>/js/jquery-3.3.1.min.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
	<!-- bootstrap js -->
	<!-- <script src="<%=path%>/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<!-- Tipso js -->
	<!-- <script src="<%=path%>/js/Tipso/tipso.min.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://websocket.nos-eastchina1.126.net/js/tipso.min.js" type="text/javascript" charset="utf-8"></script>
	<!-- mouseover js -->
	<!-- <script src="<%=path%>/js/mouseover/mover.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://websocket.nos-eastchina1.126.net/js/mover.js" type="text/javascript" charset="utf-8"></script>
	<!-- dhtmlx js -->
	<script src="<%=path%>/js/util/dhtmlxMessage/codebase/dhtmlxmessage.js" type="text/javascript" charset="utf-8"></script>
	<!-- flavr js -->
	<!-- <script src="<%=path%>/js/flavr/flavr.js" type="text/javascript" charset="utf-8"></script> -->
	<!-- <script src="https://websocket.nos-eastchina1.126.net/js/flavr.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="https://websocket.nos-eastchina1.126.net/js/flavr.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/highlight.pack.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/jquery.browser.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://websocket.nos-eastchina1.126.net/js/livedemo.js" type="text/javascript" charset="utf-8"></script>
	<!-- custom js -->
	<script src="<%=path%>/js/main.js" type="text/javascript" charset="utf-8"></script>
	<!-- <script src="https://websocket.nos-eastchina1.126.net/js/main.js" type="text/javascript" charset="utf-8"></script> -->
	<script src="<%=path%>/js/chat/chat.js" type="text/javascript" charset="utf-8"></script>
	<%--<script src="/js/chat/chat.js" type="text/javascript" charset="utf-8"></script>--%>
	<!-- <script src="https://websocket.nos-eastchina1.126.net/js/chat.js" type="text/javascript" charset="utf-8"></script> -->
	<!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
	<!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
	<!--[if lt IE 9]>
		<script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<!--[if lt IE 7]>
		<script src="https://websocket.nos-eastchina1.126.net/js/IE7.js" type="text/javascript"></script>
	<![endif]-->
	<!--[if IE 6]>
		<script src="https://websocket.nos-eastchina1.126.net/js/iepng.js" type="text/javascript"></script>
		<script type="text/javascript">
		EvPNG.fix('body, div, ul, img, li, input, a, span ,label');
	    </script>
	<![endif]-->

	<!-- Favicons -->
	<!-- <link rel="icon" href="<%=path%>/img/favicon.ico" /> -->
	<link rel="icon" href="https://websocket.nos-eastchina1.126.net/favicon.ico" />
</head>

<body class="keBody">
	<!-- 隐藏表单域 -->
	<input type="hidden" id="uid" value="<%=request.getSession().getAttribute("userid")%>" />
	<input type="hidden" id="uname" value="<%=request.getSession().getAttribute("userName")%>" />

	<!-- 顶部横版图片 -->
	<!-- <img src="<%=path%>/img/tokyo.jpg" alt="tokyo" class="img-responsive" /> -->
	<img src="https://websocket.nos-eastchina1.126.net/tokyo.jpg" alt="tokyo" class="img-responsive" />

	<div class="container" style="text-align: center;">
		<!-- 正文 -->
		<div class="kePublic">
			<!-- 正文容器 -->
			<div class="content">
				<!-- 聊天室容器 -->
				<div class="chatBox">
					<!-- 聊天室区域 -->
					<div class="chatLeft">
						<!-- 左侧聊天区域 -->
						<div class="chat01">
							<div class="chat01_title">
								<!-- 对话框上方标题栏 -->
								<ul class="talkTo">
									<!-- 显示当前的会话对象 -->
									<li>
										<a href="javascript:void(0);">
											<%=request.getSession().getAttribute("userName")%>
										</a>
									</li>
								</ul>
								<div class="dowebok">
									<!-- 关闭按钮 -->
									<div class="inner">
										<span class="close_btn" id="tip1" data-tipso="&nbsp; 安全退出"></span>
									</div>
								</div>
							</div>
							<!-- end of 标题栏 -->
							<div class="chat01_content">
								<!-- 会话内容显示区域 -->
								<!-- 每个 message_box 都是与某一个用户的会话区域 -->
								<!-- 会通过 jquery 动态加载与所有用户的会话区域, 当前初始化时只有群聊区域 -->
								<div class="message_box mes<%=request.getSession().getAttribute("userid")%>"></div>
							</div>
						</div>
						<!-- end of chat01 -->
						<div class="chat02">
							<div class="chat02_title">
								<!-- 对话框下方工具栏, 左侧有常用表情, 选择文件以及选择附件, 右侧有聊天记录 -->
								<a class="chat02_title_btn ctb01" href="javascript:void(0);"></a><!-- 常用表情 -->
								<a class="chat02_title_btn ctb02" href="javascript:void(0);" title="选择文件">
									<embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
										data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true" scale="noScale"
										menu="false" type="application/x-shockwave-flash" src="https://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
										id="swf_3140">
								</a>
								<a class="chat02_title_btn ctb03" href="javascript:void(0);" title="选择附件">
									<embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
										data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true" scale="noScale"
										menu="false" type="application/x-shockwave-flash" src="https://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
										id="swf_3140">
								</a>
								<label class="chat02_title_t">
									<a href="javascript:void(0);">聊天记录</a>
								</label>
								<div class="wl_faces_box">
									<!-- 常用表情弹出选择框 -->
									<div class="wl_faces_content">
										<div class="title">
											<!-- 弹出框标题 -->
											<ul>
												<li class="title_name">常用表情</li>
												<li class="wl_faces_close">
													<!-- 弹出框关闭按钮 -->
													<span>&nbsp;</span>
												</li>
											</ul>
										</div>
										<div class="wl_faces_main">
											<!-- 可以选择表情图标的区域 -->
											<!-- 使用 jquery 动态加载所有常用表情 -->
											<ul>
												 <!-- 会被以 li 的形式加载到这里 -->
											</ul>
										</div>
									</div>
								</div>
							</div>
							<!-- end of 工具栏 -->
							<div class="chat02_content">
								<!-- 输入框 -->
								<div contentEditable="true" id="textarea"></div>
							</div>
							<div class="chat02_bar">
								<!-- 输入框下方区域 -->
								<ul>
									<!-- 模版参考网站 -->
									<li style="left: 10px; top: 10px; padding-left: 30px;">来源：
										<a href="http://www.jq22.com/" target="_blank">jQuery插件库</a>
									</li>
									<!-- 发送按钮 -->
									<li style="right: 5px; top: 5px;">
										<a href="javascript:void(0);">
											<!-- <img src="<%=path%>/img/chat/img/send_btn.jpg"> -->
											<img src="https://websocket.nos-eastchina1.126.net/send_btn.jpg">
										</a>
									</li>
								</ul>
							</div>
							<!-- end of chat02_bar -->
						</div>
						<!-- end of chat02 -->
					</div>
					<!-- end of 左侧聊天区域 -->
					<div class="chatRight">
						<!-- 右侧成员列表 -->
						<div class="chat03">
							<div class="chat03_title">
								<!-- 列表标题 -->
								<label class="chat03_title_t"> 成员列表</label>
							</div>
							<div class="chat03_content">
								<!-- 列表内容 -->
								<!-- 显示当前在线的用户 -->
								<!-- 使用 jquery 动态加载所有在线用户 -->
								<ul>
									<!-- 会被以 li 的形式加载到这里 -->
								</ul>
							</div>
						</div>
						<!-- end of chat03 -->
					</div>
					<!-- end of 右侧成员列表 -->
					<div style="clear: both;"></div>
					<!-- 取消左右浮动 -->
				</div>
				<!-- end of 聊天室区域 -->
			</div>
			<!-- end of 聊天室容器 -->
		</div>
		<!-- end of 正文容器 -->
	</div>
	<!-- 正文结束 -->

	<!-- footer -->
	<jsp:include page="common/footer.jsp" flush="true"></jsp:include>
	<!-- end of footer -->
</body>
</html>