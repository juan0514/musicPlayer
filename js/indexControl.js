//对外暴露切换歌曲时的index值

(function ($, root) {
		'use strict';

		function ControlIndex(len) {
				this.index = 0;
				this.len = len;
		}

		ControlIndex.prototype = {
				pre() {
						return this.getIndex(-1);
				},

				next() {
						return this.getIndex(1);
				}, //计算改变后的索引
				getIndex(val) {
						var index = this.index,
						    len = this.len,
						    curIndex = (index + val + len) % len;
						this.index = curIndex;
						return curIndex;
				}
		};

		root.controlIndex = ControlIndex;
})(window.Zepto, window.player || (window.player = {}));