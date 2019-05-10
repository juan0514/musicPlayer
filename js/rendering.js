//实现页面渲染：图片，信息，isLike

(function ($, root) {
	'use strict';

	//北京图片和歌手图片

	function renderImg(src) {
		var img = new Image();
		img.src = src;
		img.onload = function () {
			$(".img-box").html(img);
			root.blurImg(img, $("body"));
		};
	}

	//歌曲歌手信息
	function renderMessage(data) {
		var str = '<div class="song-name">' + data.singer + '</div>\
				 <div class="singer-name">' + data.song + '</div>\
				 <div class="album-name">' + data.album + '</div>';
		$(".song-message").html(str);
	}

	//isLike
	function isIcon(data) {
		if (data.isLike) {
			$(".heart").addClass("likeing");
		} else {
			$(".heart").removeClass("likeing");
		}
	}

	root.render = function (data) {
		renderImg(data.image);
		renderMessage(data);
		isIcon(data);
	};
})(window.Zepto, window.player || (window.player = {}));
//在window(全局)创建rendering这个函数(属性)  
//{容错:有rendering这个属性，就直接用。没有就创建一个rendering属性(函数)}