$(function(){
	setInterval("time()", 1000);
	getMsg();
	fitcube();
});

window.onresize = function () {fitcube();}

function fitcube(){
	var el = $('.el span').width();
	$('.el span').css('height',el+'px');
}
function getMsg(){
	var slogan = [
	
	];
	var r = random(0,slogan.length-1);
	$("#slogan").html(slogan[r])
}
function random(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range);
      return num;
}
function time() {
	var time = '#' + (new Date()).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0].replace(/:/g, '');
	$('.time').text(time);
	$('.background').css('background-color', time);
};