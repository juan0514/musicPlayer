//实现按钮点击切换

(function ($, root) {
  'use strict';

  var audio = root.audioManager;
  var nowIndex = 0;
  var flag = true;

  // 点击左右键切换，和播放键
  function bindevent(data, len) {

    $(".left-arrow").on("click", function () {
      if (nowIndex == 0) {
        nowIndex = len - 1;
      } else {
        nowIndex--;
      }

      switchSong(data, nowIndex);
      //			root.pro.renderAllTime(data[nowIndex]);
      //			root.pro.pastTimes(0);
      //			root.pro.stopTimes();
      moveDot(data[nowIndex].duration);
    });

    $(".right-arrow").on("click", function () {
      if (nowIndex == len - 1) {
        nowIndex = 0;
      } else {
        nowIndex++;
      }

      switchSong(data, nowIndex);
      //			root.pro.renderAllTime(data[nowIndex]);
      //			root.pro.pastTimes(0);
      //			root.pro.stopTimes();
      moveDot(data[nowIndex].duration);
    });
  }

  //音频播放
  function play(src, nowIndex) {
    audio.getAudio(src[nowIndex].audio);

    $(".play").on("click", function () {
      if (audio.status == "pause") {
        audio.play();
        root.pro.pastTimes();
        var deg = $(".img-box").attr("data-deg");
        rotatePic(deg);
        void 0;
      } else {
        audio.pause();
        root.pro.stopTimes();
        clearInterval(timer);
        void 0;
      }
      $(this).toggleClass("playing");
    });
  }

  //切换歌曲
  function switchSong(data, nowIndex) {
    root.render(data[nowIndex]); //调用图片信息切换
    root.pro.renderAllTime(data[nowIndex]);
    root.pro.pastTimes(0);
    audio.getAudio(data[nowIndex].audio);
    if (audio.status == "play") {
      audio.play();
      rotatePic(0);

      $(".img-box").attr("data-deg", 0);
      $(".img-box").css({
        "transform": "rotateZ(0deg)",
        "transition": "none"
      });
    }
    if (audio.status == "pause") {
      root.pro.stopTimes();
      $(".img-box").attr("data-deg", 0);
      $(".img-box").css({
        "transform": "rotateZ(0deg)",
        "transition": "none"
      });
    }
  }

  //图片旋转
  var timer = null;
  function rotatePic(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
      deg += 2;
      $(".img-box").attr("data-deg", deg);
      $(".img-box").css({
        "transform": "rotateZ(" + deg + "deg)",
        "transition": "all 0.5s ease-out"
      });
    }, 100);
  }

  //拖动小圆点 
  function moveDot(len) {
    var width = $(".pro-len").offset().width;
    var left = $(".pro-len").offset().left;
    $(".pro-dot").on("touchstart", function (event) {
      root.pro.stopTimes();
    }).on("touchmove", function (event) {
      var x = event.changedTouches[0].clientX;
      var per = (x - left) / width;
      if (per > 0 && per <= 1) {
        root.pro.updata(per);
      }
    }).on('touchend', function (event) {
      var x = event.changedTouches[0].clientX;
      var per = (x - left) / width;
      if (per > 0 && per <= 1) {
        var time = per * len;
        $(".play").addClass("playing");
        root.pro.pastTimes(per);
        audio.playTo(time);
      }
    });
  }

  //点击列表按钮，渲染
  function list(data, index) {
    $(".list").on("click", function () {
      $(this).toggleClass("playlist");
      $(this).hasClass("playlist") ? $(this).addClass("playlist") & judge(data) & $(".song-list").css({ display: "block" }) : $(this).removeClass("playlist") & $(".song-list").css({ display: "none" }) & $(".switch-songs").html('');
      switchSongs(data, index);
    });
  }

  function judge(data) {
    data.forEach((ele, index) => {
      var times = Math.floor(ele.duration / 60);
      var str = '';
      str += '<p><span class="single"> ' + ele.song + "-" + ele.singer + '</span></p>';
      $(".switch-songs").append(str);
    });
  }

  //点击列表歌曲信息，切换歌曲    
  function switchSongs(data, index) {
    var p = Array.from($(".switch-songs").children());

    p.forEach((ele, index) => {
      $(ele).on("click", function () {
        var index = $(this).index();
        nowIndex = index;

        root.render(data[nowIndex]);
        root.pro.renderAllTime(data[nowIndex]);
        audio.getAudio(data[nowIndex].audio);
        audio.play();
        root.pro.pastTimes(0);
        $(".play").addClass("playing");
        $(".list").removeClass("playlist") & $(".song-list").css({ display: "none" }) & $(".switch-songs").html('');
      });
    });
  }

  root.bindevent = function (data, len, nowIndex) {
    bindevent(data, len, nowIndex);
    list(data, nowIndex);
    play(data, nowIndex);
  };
})(window.Zepto, window.player || (window.player = {}));
//在window(全局)创建rendering这个函数(属性)  
//{容错:有rendering这个属性，就直接用。没有就创建一个rendering属性(函数)}