$(function () {
	$.fn.extend({
		hoverTips: function () {
			var self = $(this);
			var sw = self.get(0).switch;
			var htmlDom = "";

			if (!sw) {
				sw = true;
				var content = self.attr("tooltips");
				htmlDom = $("<div class='tooltips'>")
					.addClass("yellow")
					.html("<p class='content'></p>" +
						"<p class='triangle-front'></p>" +
						"<p class='triangle-back'></p></div>");
				htmlDom.find("p.content").html(content);
			}

			self.on("mouseover", function () {
				$("body").append(htmlDom);
				// css("border-width") 只在 chrome 中可用, 为了兼容其他浏览器, 需要改为 css("border-bottom-width")
				// 因为 border-width 在其他浏览器中是分为四个属性设置的
				// 					var left = self.offset().left - htmlDom.outerWidth() - parseInt(htmlDom.find(".triangle-front").css(
				// 						"border-width"));
				
				var left = self.offset().left - htmlDom.outerWidth() - parseInt(htmlDom.find(".triangle-front").css(
				"border-bottom-width"));
				var top = self.offset().top + (self.outerHeight() - htmlDom.outerHeight()) / 2;
				htmlDom.css({
					"left": left,
					"top": top - 10,
					"display": "none"
				});
				setTimeout(function () {
					htmlDom.css({
						"display": "block"
					});
					htmlDom.stop().animate({
						"top": top,
						"opacity": 1
					}, 300);
				}, 1000);
			});

			self.on("mouseout", function () {
				var top = parseInt(htmlDom.css("top"));
				htmlDom.stop().animate({
					"top": top - 10,
					"opacity": 0
				}, 300, function () {
					htmlDom.remove();
					sw = false;
				});
			});
		},

		clickTips: function () {
			var self = $(this);
			var sw = self.get(0).switch;

			if (!sw) {
				sw = true;
				var content = self.attr("tooltips");
				var htmlDom = $("<div class='tooltips'>")
					.addClass("yellow")
					.html("<p class='content'></p>" +
						"<p class='triangle-front'></p>" +
						"<p class='triangle-back'></p></div>");
				htmlDom.find("p.content").html(content);
			}

			self.on("click", function () {
				$("body").append(htmlDom);
				var left = self.offset().left - htmlDom.outerWidth() / 2 + self.outerWidth() / 2;
				var top = self.offset().top - htmlDom.outerHeight() - parseInt(htmlDom.find(".triangle-front").css(
					"border-width"));
				htmlDom.css({
					"left": left,
					"top": top - 10,
					"display": "block"
				});
				htmlDom.stop().animate({
					"top": top,
					"opacity": 1
				}, 300, function () {
					setTimeout(function () {
						htmlDom.stop().animate({
							"top": top - 10,
							"opacity": 0
						}, 300, function () {
							htmlDom.remove();
							sw = false;
						})
					}, 2000)
				});
			})
		}
	});
});
