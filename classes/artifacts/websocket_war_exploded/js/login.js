$(function () {
	// 检查登录表单信息
	$('#btnLogin').click(checkLogin);

	// 清除警告
	$('#userName').click(function () {
		$('#alertMessage').html('&emsp;');
	});

	// 清除警告
	$('#password').click(function () {
		$('#alertMessage').html('&emsp;');
	});

	// 监听回车事件
	$('#userName').on('keydown', function (event) {
		if (13 == event.keyCode) {
			checkLogin();
		}
	});

	// 监听回车事件
	$('#password').on('keydown', function (event) {
		if (13 == event.keyCode) {
			checkLogin();
		}
	});
});

// 弹出框
function pop() {
	var count = 1;
	new $.flavr('正在登录中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	var flavr = $('.flavr-content');
	var message = $('.flavr-message');

	$('.flavr-toolbar').remove();
	$('.flavr-outer').css('background', '#5CB85C');
	flavr.css({
		'padding': '20px', 
		'font-size': '14px'
	});
	message.css('text-align', 'center');

	setInterval(function () {
		var text = '正在登录中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

		if (2 == count) {
			text = '正在登录中.&nbsp;&nbsp;&nbsp;&nbsp;';
		} else if (3 == count) {
			text = '正在登录中.&nbsp;.&nbsp;&nbsp;';
		} else if (4 == count) {
			text = '正在登录中.&nbsp;.&nbsp;.'
			count = 1;
		}

		++count;
		// 弹框
		message.html(text);
	}, 300);
}

// 进行登录验证
function checkLogin() {
	var userName = $('#userName').val().trim();
	var password = $('#password').val().trim();
	var alertMessage = $('#alertMessage');
	alertMessage.html('&emsp;');

	if ('' == userName || '' == password) {
		alertMessage.text('请填写完整信息');
		alertMessage.css('color', 'red');
		return;
	}

	if (userName.length > 30 || password.length > 50) {
		alertMessage.text('用户名或密码长度过长');
		alertMessage.css('color', 'red');
		return;
	}

	var datas = {
		userName: userName,
		password: password
	};

	$.ajax({
		type: 'POST',
		data: datas,
		dataType: 'json',
		url: 'logincheckservlet',
		success: function (data) {
			console.log('login { status:'+ data.status + ', message: ' + data.message + ' }');

			if (1000 == data.status) {
				pop();
				setTimeout(() => {
					$(location).attr('href', 'main.html?timeStamp=' + new Date().getTime());
				},1000);
			} else {
				alertMessage.text(data.message);
				alertMessage.css('color', 'red');
			}
		}
	});
}