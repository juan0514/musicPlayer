//获取数据的函数
'use strict';

var root = window.player;

var len,
    nowIndex = 0;

function getData(url) {
	$.ajax({
		type: "GET",
		url: url,
		success(data) {
			len = data.length;
			root.render(data[nowIndex]);
			root.bindevent(data, len, nowIndex);
			root.pro.renderAllTime(data[nowIndex]);
		},
		error(ero) {
			void 0;
		}
	});
}

//let data = require('../data.json')


getData("../mock/data.json");