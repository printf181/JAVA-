$(function () {
	// 加载底部导航栏
	$('#footer').load('../view/common/footer.html');

	// 检查注册表单信息
	$('#btnRegister').click(checkRegister);

	// 清除警告
	$('#userName').click(function () {
		$('#alertMessage').html('&emsp;');
	});

	// 清除警告
	$('#password').click(function () {
		$('#alertMessage').html('&emsp;');
	});

	// 清除警告
	$('#confirmPassword').click(function () {
		$('#alertMessage').html('&emsp;');
	});

	// 监听回车事件
	$('#userName').on('keydown', function (event) {
		if (13 == event.keyCode) {
			checkRegister();
		}
	});

	// 监听键盘事件
	$('#password').on('keyup', function (event) {
		checkPassword(event);
	});

	// 监听键盘事件
	$('#confirmPassword').on('keyup', function (event) {
		checkPassword(event);
	});
});


// 进行确认密码的验证
function checkPassword(event) {
	// 检查回车
	if (13 == event.keyCode) {
		checkRegister();
		return;
	}

	var password = $('#password').val().trim();
	var confirmPassword = $('#confirmPassword').val().trim();

	if (0 == password.length || 0 == confirmPassword.length) {
		return;
	}

	var alertMessage = $('#alertMessage');

	if (password != confirmPassword) {
		alertMessage.text('两次密码输入不一致');
		alertMessage.css('color', 'red');
	} else {
		alertMessage.html('&emsp;');
	}
}

// 弹出框
function pop() {
	var count = 1;
	new $.flavr('注册成功, 正在登录中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
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
		var text = '注册成功, 正在登录中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

		if (2 == count) {
			text = '注册成功, 正在登录中.&nbsp;&nbsp;&nbsp;&nbsp;';
		} else if (3 == count) {
			text = '注册成功, 正在登录中.&nbsp;.&nbsp;&nbsp;';
		} else if (4 == count) {
			text = '注册成功, 正在登录中.&nbsp;.&nbsp;.'
			count = 1;
		}

		++count;
		// 弹框
		message.html(text);
	}, 300);
}

// 进行注册验证
function checkRegister() {
	var userName = $('#userName').val().trim();
	var password = $('#password').val().trim();
	var confirmPassword = $('#confirmPassword').val().trim();
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

	if (password != confirmPassword) {
		alertMessage.text('两次密码输入不一致');
		alertMessage.css('color', 'red');
		return;
	}

	var datas = {
		userName: userName,
		password: password
	};

	// 注册成功, 自动登录
	$.ajax({
		type: 'POST',
		data: datas,
		dataType: 'json',
		url: 'registercheckservlet',
		success: function (data) {
			console.log('register { status:' + data.status + ', message: ' + data.message + ' }');

			if (1000 == data.status) {
				pop();
				setTimeout(() => {
					$(location).attr('href', 'main.html?timeStamp=' + new Date().getTime());
				}, 1000);
			} else if (1001 == data.status) {
				alertMessage.text(data.message);
				alertMessage.css('color', 'red');
			}
		}
	});
}