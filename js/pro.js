//进度条

(function ($, root) {

	var timer = null,
	    lastper = 0,
	    allTime = 0,
	    startTime = 0;

	var flag = true;

	//渲染每首歌曲的时间 duration
	function renderAllTime(data) {
		lastper = 0;
		allTime = data.duration;
		var times = handle(allTime);
		$(".all-time").html(times);
	}

	//处理时间格式的函数：
	function handle(times) {
		times = Math.round(times);
		var minute = Math.floor(times / 60),
		    seconds = times % 60;

		if (minute < 10) {
			minute = "0" + minute;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return time = minute + ":" + seconds;
	}

	//渲染开始时间
	function pastTimes(p) {
		flag = true;
		lastper = p ? p : lastper;
		startTime = new Date().getTime(); //记录开始时间

		function monitor() {
			var curTime = new Date().getTime();
			flag ? curTime : curTime = startTime;

			void 0;
			var percent = lastper + (curTime - startTime) / (allTime * 1000);
			if (percent < 1) {
				timer = requestAnimationFrame(monitor);
				updata(percent);
			} else {
				cancelAnimationFrame(timer);
			}
		}
		monitor();
	}

	//暂停播放
	function stopTimes() {

		cancelAnimationFrame(timer);
		var stopTime = new Date().getTime();
		lastper = lastper + (stopTime - startTime) / (allTime * 1000);
		flag = false;
	}

	//更新已播放时间 ， 进度条走过的
	function updata(per) {
		//时间
		var renderTime = allTime * per;
		rTime = handle(renderTime);
		$(".current-time").html(rTime);

		//进度条
		var strip = (per - 1) * 100;
		$(".pro-top").css({
			transform: "translateX(" + strip + "%)"
		});
	}

	root.pro = {
		renderAllTime: renderAllTime,
		updata: updata,
		pastTimes: pastTimes,
		stopTimes: stopTimes
	};
})(window.Zepto, window.player || (window.player = {}));