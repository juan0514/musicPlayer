//实现播放，暂停，获取音频

(function ($, root) {
  'use strict';

  function AudioManager(src) {
    //创建音频
    this.audio = new Audio();
    //音频默认状态(暂停)
    this.status = "pause";
  }

  AudioManager.prototype = {
    play: function () {
      this.audio.play();
      this.status = "play";
    },

    pause: function () {
      this.audio.pause();
      this.status = "pause";
    },

    getAudio: function (src) {
      this.audio.src = src;
      this.audio.load();
    },
    playTo: function (time) {
      this.audio.currentTime = time;
      this.play();
    }
  };

  root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}));