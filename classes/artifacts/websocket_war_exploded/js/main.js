
$(function () {
	// 加载底部导航栏
	$('.close_btn').click(safeExit);

	// 初始化 Tipso 提示框
	$('#tip1').tipso({
		useTitle: false
	});
});

// 清除 session 并安全退出
function safeExit() {
	// 弹出提示语句
	pop();

	var datas = {
		userid: $('#uid').val().trim(),
		userName: $('#uname').val().trim()
	}

	$.ajax({
		type: 'POST',
		url: 'safeexit',
		data: datas,
		dataType: 'json',
		success: function (data) {
			console.log('safe exit { status:' + data.status + ', message: ' +
				data.message + ' }');

			if (1000 == data.status) {
				setTimeout(() => {
					$(location).attr('href', 'login.html');
				}, 2000);
			}
		}
	});
}

// 弹出框
function pop() {
	var count = 1;
	new $.flavr('正在安全退出中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	var flavr = $('.flavr-content');
	var message = $('.flavr-message');

	$('.flavr-toolbar').remove();
	flavr.css({
		'padding': '30px',
		'font-size': '15px'
	});
	message.css('text-align', 'center');

	setInterval(function () {
		var text = '正在安全退出中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

		if (2 == count) {
			text = '正在安全退出中.&nbsp;&nbsp;&nbsp;&nbsp;';
		} else if (3 == count) {
			text = '正在安全退出中.&nbsp;.&nbsp;&nbsp;';
		} else if (4 == count) {
			text = '正在安全退出中.&nbsp;.&nbsp;.'
			count = 1;
		}

		++count;
		// 弹框
		message.html(text);
	}, 300);
}