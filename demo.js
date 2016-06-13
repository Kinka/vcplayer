/*var v = document.getElementById('vvv');
var events = [
	'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadedmetadata',, 'loadeddata',
	'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate',
	'volumechange', 'waiting'
];
v.loop = false;
v.autoplay = false;
console.log(events.length)
for (var i = 0; i<events.length; i++) {
	v.addEventListener(events[i], function(e) {
		if (v.buffered.length == 0) return;
		console.log(e.type, v.currentTime, v.buffered.end(0), v.duration)
	});
}

v.src = "http://2527.vod.myqcloud.com/2527_56c5226c165c11e697add7d1c60ca413.f20.mp4";*/
import Player from './src/Player'
import * as dom from './src/dom'
import Volume from './src/controls/Volume'
import * as browser from './src/browser'
import './src/css/vcplayer.css';

window.xxlog = window.xxlog || console.log;
console.log = function(a,b,c,d,e,f) {
	try {if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('INFO:') > -1) return;} catch (e) {}
	if (browser.IS_IE8 || browser.IS_IE9)
		window.xxlog(a || '',b || '',c||'',d||'',e||'',f||'');
	else
		xxlog.apply(this, arguments);
};

window.player = new Player({
	owner: 'demo_video',
	autoplay: null,
	// width: 800,
	// height: 400,
	controls: null,
	volume: 0.5,
	src: 'http://2527.vod.myqcloud.com/2527_bffd50081d9911e6b0f4d93c5d81f265.f20.mp4',
	// src: 'http://2527.vod.myqcloud.com/2527_1bf8b2da449211e595f01db4637252be.f20.mp4',
	poster: 'https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png',
	listener: function(msg) {
		if (msg.type == 'timeupdate' || msg.type == 'progress' || msg.type === 'printLog') return;
		console.log(msg.ts, 'g ', msg.type, msg.info)
	}
});

/*window.player2 = new Player({
	owner: 'demo_video2',
	autoplay: false,
	width: 300,
	height: 400,
	src: 'http://2527.vod.myqcloud.com/2527_bffd50081d9911e6b0f4d93c5d81f265.f20.mp4',
	poster: 'https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png',
	listener: function(msg) {
		if (msg.type == 'progress') return;
		console.log('global2', msg)
	}
});*/

window.dom = dom;
window.Volume = Volume;
dom.on(window, 'resize', function() {
	// player.size(document.documentElement.clientWidth, document.documentElement.clientHeight);
});
// setTimeout(function() {player.destroy()}, 1000)
var prefetch = ['stop_btn', 'fullscreen_exit', 'muted'];
for (var i=0; i<prefetch.length; i++)
	new Image().src = '/src/img/' + prefetch[i] + '.svg';