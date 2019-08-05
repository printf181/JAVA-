// 当前用户的 id 和昵称
var userid;
var userName;
// 目标用户的 id 和昵称
var talkToid;
var talkToName;
// websocket 对象
var websocket = null;
// 成员列表闪烁事件 id Map
var liBlink = {};
// 标签页消息提醒
var titleBlink = null;

// 加载
$(document).ready(function () {
		// 设置右侧成员列表
		// 显示群聊昵称
		userid = $("#uid").val();
		userName = $("#uname").val();
		talkToName = userName;
		talkToid = userid;
		talkToName += '\u3010\u7fa4\u804a\u3011';
		$('.talkTo a').text(talkToName);

		// 显示会话内容
		$(".mes" + talkToid).show().siblings().hide();

		// 表情图标鼠标悬停事件
		$(".ctb01").mouseover(function () {
			$(".wl_faces_box").show();
		}).mouseout(function () {
			$(".wl_faces_box").hide();
		});

		// 初始化常用表情
		setTimeout(function () {
			initEmoji();
		}, 700);

		// 发送按钮点击事件
		$(".chat02_bar img").click(function () {
			sendMessage()
		});

		// 监听输入框回车事件, 发送消息
		$('#textarea').on('keydown', function (event) {
			if (13 == event.keyCode) {
				sendMessage();
				// 阻止换行符的落下
				return false;
			}
		});

		// 设置光标位置
		$.fn.setCursorPosition = function () {
			$(this).focus();
			return $(this).setSelection();
		};

		// 计算光标位置
		$.fn.setSelection = function () {
			if (window.getSelection) {
				var range = window.getSelection();
				range.selectAllChildren(this[0]);
				range.collapseToEnd(); // 光标移至最后
			} else if (document.selection) {
				var range = document.selection.createRange();
				range.moveToElementText(this[0]);
				range.collapse(false); // 光标移至最后
				range.select();
			} else {
				return false;
			}

			return true;
		};

		// 设置光标聚焦至最后
		$.fn.focusEnd = function () {
			$(this).setCursorPosition();
		}
	}),

	// 添加标签页消息提示事件
	function (fun) {
		fun.extend({
			blinkTitle: {
				show: function () {
					var count = 0,
						title = document.title,
						blink = null;

					if (-1 == document.title.indexOf("\u3010")) {
						blink = setInterval(function () {
							count++;
							3 == count && (count = 1);
							1 == count && (document.title = "\u3010\u3000\u3000\u3000\u3011" + title);
							2 == count && (document.title = "\u3010\u65b0\u6d88\u606f\u3011" + title);
						}, 500);
					}

					return [blink, title];
				},
				clear: function (titleBlink) {
					titleBlink && (clearInterval(titleBlink[0]), document.title = titleBlink[1]);
				}
			}
		})
	}(jQuery);

// 标签页新消息提示
function blink() {
	// 如果没有提示, 那就开始提示吧
	if (null == titleBlink) {
		titleBlink = $.blinkTitle.show();

		setTimeout(function () {
			titleBlink && $.blinkTitle.clear(titleBlink);
			titleBlink = null;
		}, 8000);
	}
}

// 初始化常用表情
function initEmoji() {
	var emoji = $('.wl_faces_main ul');

	// 添加表情
	for (var i = 1; i <= 60; ++i) {
		if (i < 10) {
			emoji.append("<li><a href='javascript:void(0);'><img src='https://websocket.nos-eastchina1.126.net/emoji/emo_0" + i +
				".gif' /></a></li>");
		} else {
			emoji.append("<li><a href='javascript:void(0);'><img src='https://websocket.nos-eastchina1.126.net/emoji/emo_" + i +
				".gif' /></a></li>");
		}
	}

	// 常用表情点击事件, 进入输入框
	$(".wl_faces_main img").click(function () {
		var img = document.createElement('img');
		img.src = $(this).attr("src");
		img.draggable = false;
		$("#textarea").append(img);
		$(".wl_faces_box").hide();
		$("#textarea").focusEnd();
	});

	// 常用表情弹出框鼠标悬停事件
	$(".wl_faces_box").mouseover(function () {
		$(".wl_faces_box").show();
	}).mouseout(function () {
		$(".wl_faces_box").hide();
	});

	// 常用表情弹出框关闭事件
	$(".wl_faces_close").click(function () {
		$(".wl_faces_box").hide();
	});
}

// 会话框内容上屏, 发送
function sendMessage() {
	// 准备生成消息日期
	var date = new Date(),
		dateStr = "";
	// 拼接日期
	dateStr += date.getFullYear() + "-", dateStr += date.getMonth() + 1 + "-", dateStr += date.getDate() + " ",
		dateStr += date.getHours() + ":", dateStr += date.getMinutes() +
		":", dateStr += date.getSeconds();
	// 获取输入框内容
	var data = $("#textarea").html().trim();

	// 判断输入内容是否为空
	if (null != data && "" != data) {
		// 上屏内容拼接
		var content = "<div class='message clearfix'><div class='user-logo'><img src='" + $('.chat03_content img:first').attr(
				'src') + "'/>" + "</div>" +
			"<div class='wrap-text'>" + "<h5 class='clearfix'>" + userName + "</h5>" + "<div>" + data +
			"</div>" + "</div>" +
			"<div class='wrap-ri'>" + "<div clsss='clearfix'><span>" + dateStr + "</span></div>" + "</div>" +
			"<div style='clear:both;'></div>" + "</div>";
		// 消息上屏
		$(".mes" + talkToid).append(content);
		$(".chat01_content").scrollTop($(".mes" + talkToid).height());
		$("#textarea").html("");

		// 数据包封装
		var datas = {
			type: 'single',
			sendUid: userid,
			sendUName: userName,
			receUid: talkToid,
			receUName: talkToName,
			data: data,
			dateTime: dateStr
		};

		// 判断是否为群发
		if (userid == talkToid) {
			datas['type'] = 'multiple';
		}

		// 发送消息
		sendByWebSocket(datas);
	} else {
		dhtmlx.message({
			type: 'error',
			text: "\u8bf7\u8f93\u5165\u804a\u5929\u5185\u5bb9!"
		});
	}
}

// window.alert(js代码不执行);
// 初始化 WebSocket
$(document).ready(function () {
	// 判断当前浏览器是否支持 WebSocket
	if ('WebSocket' in window) {
		userid = $("#uid").val();
		userName = $("#uname").val();
		websocket = new WebSocket("wss://127.0.0.1:8080/WebSocket-v1.0/websocket");
		// 连接建立成功后的回调方法
		websocket.onopen = function () {
			window.alert(onopen了);
			// 准备生成消息日期
			window.alert();
			var date = new Date(),
				dateStr = "";
			// 拼接日期
			dateStr += date.getFullYear() + "-", dateStr += date.getMonth() + 1 + "-", dateStr += date.getDate() + " ",
				dateStr += date.getHours() + ":", dateStr += date.getMinutes() +
				":", dateStr += date.getSeconds();
			// 数据包封装
			var datas = {
				type: 'init',
				sendUid: userid,
				sendUName: userName,
				receUid: "server",
				receUName: "server",
				data: '',
				dateTime: dateStr
			};
			// 发送
			sendByWebSocket(datas);
			console.log("WebSocket 连接建立成功");
			window.alert(成了);
		};

		// 接收到消息的回调方法
		websocket.onmessage = function (event) {
			receiveMessage(event.data);
			console.log("接收到的消息: " + event.data);
		};

		// 连接关闭的回调方法
		websocket.onclose = function () {
			console.warn("WebSocket 连接关闭!");
		};

		// 连接发生错误的回调方法
		websocket.onerror = function () {
			console.error("WebSocket 连接发生错误!");
		};
	} else {
		alert('当前浏览器不支持 WebSocket, 聊天功能暂无法实现. 请更换浏览器后重试, 推荐使用 firefox 浏览器');
	}

	// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server 端会抛异常。
	window.onbeforeunload = function () {
		websocket.close();
	}
});

// 发送消息
function sendByWebSocket(datas) {
	if (2 == websocket.readyState || 3 == websocket.readyState) {
		new $.flavr('聊天已关闭, 请重新登录');

		$('.flavr-toolbar').remove();
		$('.flavr-content').css('padding', '30px');
		$('.flavr-content').css('font-size', '15px');
		$('.flavr-outer').css('background', '#FF0000');
		$('.flavr-message').css('text-align', 'center');

		setTimeout(() => {
			$('.flavr-content').remove();
			safeExit();
		}, 1000);

		return;
	}
	// JSON 转字符串
	datas = JSON.stringify(datas);
	// 发送
	websocket.send(datas);
	console.log("消息发送成功! 内容为: " + datas);
}

// 接收消息 (主要函数)
function receiveMessage(message) {
	// 字符串转 JSON
	message = JSON.parse(message);
	// 判断消息类型
	if ('single' == message.type || 'multiple' == message.type) {
		receMessageSingleOrMultiple(message);
	} else if ('update' == message.type) {
		receMessageUpdate(message);
	} else if ('init' == message.type) {
		console.log('初始化中: ' + message);
	} else {
		console.error('未知来源的数据: ' + message);
	}
}

// 接收消息
function receMessageSingleOrMultiple(message) {
	// 接收者的列表位置
	var li = $('#' + message.sendUid);
	// 标识是否需要闪烁
	var flag = false;
	// 上屏内容拼接
	var content = "<div class='message clearfix'><div class='user-logo'><img src='" + li.find('img').attr('src') + "'/>" +
		"</div>" +
		"<div class='wrap-text'>" + "<h5 class='clearfix'>" + message.sendUName + "</h5>" + "<div>" + message.data +
		"</div>" + "</div>" +
		"<div class='wrap-ri'>" + "<div clsss='clearfix'><span>" + message.dateTime + "</span></div>" + "</div>" +
		"<div style='clear:both;'></div>" + "</div>";
	// 消息上屏
	// 如果是群发, 显示到群聊区域
	if ('multiple' == message.type) {
		li = $('.chat03_content li:first');
		message['sendUid'] = userid;
	}
	$(".mes" + message.sendUid).append(content);
	if ($('.choosed').attr('id') != message.sendUid) {
		flag = true;
	}else {
		$(".chat01_content").scrollTop($(".mes" + message.sendUid).height());
	}
	// 新消息不在当前页面显示时才应该有闪烁提示, 否则不需要闪烁
	if (flag) {
		// 列表闪烁
		var count = 1;
		// 判断是否正在闪烁, 没有的话才需要设置闪烁
		if (null == liBlink[message.sendUid]) {
			liBlink[message.sendUid] = setInterval(function () {
				if (1 == count) {
					li.css('background', '#EAAA15');
					++count;
				} else {
					li.css('background', '#FFFFFF');
					count = 1;
				}
			}, 500);
			setTimeout(function () {
				liBlink[message.sendUid] && (clearInterval(liBlink[message.sendUid]), li.css('background', '#EAAA15'));
				liBlink[message.sendUid] = null;
			}, 8000);
			// 标签页标题闪烁
			blink();
		}
	}
}

// 更新成员列表和会话内容显示区域
function receMessageUpdate(message) {
	// 获取标签
	var ul = $('.chat03_content ul');
	var content = $('.chat01_content');

	// 标识用户是否还在线
	var isAlive = false;

	// 清空原有项
	ul.empty();

	data = message.data;
	for (var i = 0; i < data.length; ++i) {
		// 判断用户是否还在线
		if (talkToid == data[i].userid) {
			isAlive = true;
		}

		// 如果是自己就要添加到最前面
		if (userid == data[i].userid) {
			ul.prepend("<li id='" + data[i].userid + "'><label class='online'> </label><a href='javascript:void(0);'>" +
					"<img src='/WebSocket-v1.0/img/chat/img/head/201" + (i % 10) + ".jpg' tooltips='" + data[i].userName + "'></a>" +
					"<a href='javascript:void(0);' class='chat03_name'>" + data[i].userName + "</a></li>");
			continue;
		}
		// 添加新的用户对话显示区域
		if (0 == content.find('.mes' + data[i].userid).length) {
			content.append("<div class='message_box mes" + data[i].userid + "'></div>");
		}
		// 往列表中添加成员
		ul.append("<li id='" + data[i].userid + "'><label class='online'> </label><a href='javascript:void(0);'>" +
			"<img src='/WebSocket-v1.0/img/chat/img/head/201" + (i % 10) + ".jpg' tooltips='" + data[i].userName + "'></a>" +
			"<a href='javascript:void(0);' class='chat03_name'>" + data[i].userName + "</a></li>");
	}
	// 保持上一次的选中状态
	// 如果用户还在线就保持原来的, 否则默认群聊
	if (!isAlive) {
		// 清除掉线用户的一些影响
		// 例如昵称弹出框
		if('undefind' != $('.tooltips') && null != $('.tooltips')) {
			$('.tooltips').each(function() {
				if ($(this).find('p.content').html() == talkToName) {
					$(this).remove();
				}
			});
		}

		// 设置为群聊
		talkToid = userid;
		talkToName = userName + '\u3010\u7fa4\u804a\u3011';
	}
	ul.find('#' + talkToid).addClass('choosed');
	$(".mes" + talkToid).show().siblings().hide();
	content.scrollTop($(".mes" + talkToid).height());
	$('.talkTo a').text(talkToName);

	// 成员列表鼠标悬停事件
	$(".chat03_content li").mouseover(function () {
		$(this).addClass("hover").siblings().removeClass("hover");
	}).mouseout(function () {
		$(this).removeClass("hover").siblings().removeClass("hover");
	});

	var lastLi = ul.find('.choosed');
	// 成员列表双击事件
	$(".chat03_content li").dblclick(function () {
		talkToid = $(this).attr('id');
		talkToName = $(this).children(".chat03_name").text();
		(userid == talkToid) && (talkToName += '\u3010\u7fa4\u804a\u3011');

		// 清除上一次点击列表项的背景色
		lastLi.css('background', '');
		// 停止闪烁
		liBlink[talkToid] && clearInterval(liBlink[talkToid]);
		liBlink[talkToid] = null;
		titleBlink && (clearInterval(titleBlink[0]), document.title = titleBlink[1]);
		titleBlink = null;
		// 设置当前列表项选中
		lastLi = $(this);
		$(this).addClass("choosed").siblings().removeClass("choosed");
		$(this).css('background', 'rgb(235,238,243)');
		// 设置会话显示区域
		$(".talkTo a").text(talkToName);
		$(".mes" + talkToid).show().siblings().hide();
		// 向上滚动
		$(".chat01_content").scrollTop($(".mes" + talkToid).height());
	});

	// 初始化昵称弹出框
	$('.chat03_content img').each(function () {
		$(this).hoverTips();
	});
}