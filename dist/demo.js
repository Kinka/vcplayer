/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _player2 = __webpack_require__(2);
	
	__webpack_require__(3);
	
	var $ = function $(selector) {
		return document.querySelector(selector);
	};
	//import {TcPlayer} from './src/TcPlayer.js'
	// var Player = vcp.Player, browser = vcp.browser, util = vcp.util;
	
	var $$ = function $$(selector) {
		return document.querySelectorAll(selector);
	};
	
	var app = $('#app');
	var log = $('#logging');
	var domLive = $('#is_live'),
	    domDebug = $('#is_debug'),
	    domFlash = $('#use_flash'),
	    domControls = $('#use_controls'),
	    domAutoplay = $('#is_autoplay'),
	    domSrc = $('#play_src'),
	    domMp4 = $('#play_mp4'),
	    domM3u8 = $('#play_m3u8'),
	    domRtmp = $('#play_rtmp'),
	    domFlv = $('#play_flv'),
	    domCheckPoster = $('#c_poster'),
	    domPoster = $('#poster_src');
	var btnLoad = $('#btn_load');
	
	domMp4.value = 'http://2527.vod.myqcloud.com/2527_bffd50081d9911e6b0f4d93c5d81f265.f20.mp4';
	domM3u8.value = 'http://2527.vod.myqcloud.com/2527_542d5a28222411e6aadec1104f4fc9b9.f220.av.m3u8';
	domFlv.value = 'http://2000.liveplay.myqcloud.com/live/2000_f3d7cff5e69511e5b91fa4dcbef5e35a.flv';
	domFlv.value = 'http://2527.vod.myqcloud.com/2527_370afa50f89911e48c365fad2406f3b7.f110.flv';
	domRtmp.value = 'rtmp://2000.liveplay.myqcloud.com/live/2000_f3d7cff5e69511e5b91fa4dcbef5e35a_550';
	
	domPoster.value = 'http://www.imagesbuddy.com/images/130/2014/01/whatever-garfield-face-graphic.jpg';
	
	restore();
	
	var radios = $$('[name=play_group');
	for (var i = 0; i < radios.length; i++) {
		radios[i].onclick = function () {
			if (this.checked) {
				domSrc.value = this.nextSibling.nextSibling.value;
				_player2.util.store('playtype', this.id);
			}
		};
		if (radios[i].checked) domSrc.value = radios[i].nextSibling.nextSibling.value;
	}
	// domSrc.value = 'rtmp://10.235.8.207:80/live/2427_f3e9773b548e11e6a2cba4dcbef5e35a?txkey=qcloud';
	window.xxlog = window.xxlog || console.log;
	console.log = function (a, b, c, d, e, f) {
		try {
			if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('INFO:') > -1) return;
		} catch (e) {}
		if (_player2.browser.IS_IE8 || _player2.browser.IS_IE9) {
			window.xxlog(a || '', b || '', c || '', d || '', e || '', f || '');
		} else {
			xxlog.apply(this, arguments);
		}
	};
	// 自定义提示语示例
	var CustomTips = {
		// VideoSourceError: '',
		NetworkError: '网络有问题。。。',
		// VideoDecodeError: '',
		// ArgumentError: '',
		2048: 'M3U8跨域限制'
	};
	
	window.player = newPlayer('demo_video');
	// newPlayer('demo_video2')
	
	function newPlayer(ownerId) {
		save();
	
		$('#' + ownerId).innerHTML = '';
		//TcPlayer
		var options = {
			wording: CustomTips,
			owner: ownerId,
			autoplay: domAutoplay.checked,
			// width: 800,
			// height: 400,
			controls: domControls.checked,
			// volume: 0.8,
			debug: domDebug.checked,
			src: domSrc.value,
			live: domLive.checked,
			flash: domFlash.checked,
			// poster: domPoster.value,
			poster: {
				src: domCheckPoster.checked ? domPoster.value : ''
				// src: 'http://www.imagesbuddy.com/images/130/2014/01/whatever-garfield-face-graphic.jpg',
				// start: 'http://www.imagesbuddy.com/images/130/2014/01/whatever-im-late-anyway-clock-graphic.jpg',
				// pause: 'http://www.imagesbuddy.com/images/130/2014/01/whatever-garfield-face-graphic.jpg',
				// end: 'http://www.imagesbuddy.com/images/130/2014/01/whatever-girl-graphic.jpg',
				// style: 'stretch'
			},
			listener: function listener(msg) {
				if (msg.type == 'timeupdate' || msg.type === 'printLog' || msg.type == 'mediaTime') return;
				console.log(msg.ts, 'g' + this.guid, msg.type, msg.detail);
				log.innerHTML += Number(msg.ts / 1000).toFixed(0) + ': p' + this.guid + ' <span class="em">[' + msg.type + ']</span>' + (msg.detail ? JSON.stringify(msg.detail) : '') + '<br/><br/>';
				log.scrollTop = log.scrollHeight;
				switch (msg.type) {
					case 'resize':
					case 'loadedmetadata':
						this.size(this.options.width, this.options.height, 'fit');
						break;
					case 'error':
						// alert(msg.detail.code + ', ' + msg.detail.reason)
						break;
				}
			}
		};
	
		/*var options = {
	 	flv : 'http://2157.liveplay.myqcloud.com/live/2157_358556a1088511e6b91fa4dcbef5e35a.flv',
	 	autoplay: true,
	 	coverpic: 'http://www.imagesbuddy.com/images/130/2014/01/whatever-garfield-face-graphic.jpg'
	 };*/
	
		//var _player = new TcPlayer( ownerId ,options);
	
		var _player = new _player2.Player(options);
		return _player;
	}
	_player2.dom.on(log, 'click', function () {
		log.style.display = 'none';
	});
	function save() {
		_player2.util.store('live', domLive.checked);
		_player2.util.store('debug', domDebug.checked);
		_player2.util.store('controls', domControls.checked);
		_player2.util.store('flash', domFlash.checked);
		_player2.util.store('autoplay', domAutoplay.checked);
	}
	function restore() {
		domLive.checked = _player2.util.store('live');
		domDebug.checked = _player2.util.store('debug');
		domControls.checked = _player2.util.store('controls');
		domFlash.checked = _player2.util.store('flash');
		domAutoplay.checked = _player2.util.store('autoplay');
		var id = _player2.util.store('playtype');
		if (id) {
			$('#' + id).checked = true;
		}
	}
	
	btnLoad.onclick = function () {
		window.player = newPlayer('demo_video');
	};
	
	/*window.player2 = new Player({
		owner: 'demo_video2',
		autoplay: false,
		width: 300,
		height: 400,
		src: 'http://2527.vod.myqcloud.com/2527_bffd50081d9911e6b0f4d93c5d81f265.f20.mp4',
		// src: 'http://2527.vod.myqcloud.com/2527_542d5a28222411e6aadec1104f4fc9b9.f220.av.m3u8',
		poster: 'https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png',
		listener: function(msg) {
			if (msg.type == 'timeupdate' || msg.type == 'progress' || msg.type === 'printLog') return;
			console.log(msg.ts, 'g2 ', msg.type, msg.detail)
		}
	});*/
	
	// setTimeout(function() {player.destroy()}, 1000)

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Player = exports.dom = exports.util = exports.browser = exports.MSG = undefined;
	
	__webpack_require__(3);
	
	var _browser = __webpack_require__(7);
	
	var __browser = _interopRequireWildcard(_browser);
	
	var _dom = __webpack_require__(8);
	
	var __dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var __util = _interopRequireWildcard(_util);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _H5Video = __webpack_require__(11);
	
	var _H5Video2 = _interopRequireDefault(_H5Video);
	
	var _FlashVideo = __webpack_require__(13);
	
	var _FlashVideo2 = _interopRequireDefault(_FlashVideo);
	
	var _Panel = __webpack_require__(14);
	
	var _Panel2 = _interopRequireDefault(_Panel);
	
	var _BigPlay = __webpack_require__(22);
	
	var _BigPlay2 = _interopRequireDefault(_BigPlay);
	
	var _Poster = __webpack_require__(23);
	
	var _Poster2 = _interopRequireDefault(_Poster);
	
	var _Loading = __webpack_require__(24);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ErrorTips = __webpack_require__(25);
	
	var _ErrorTips2 = _interopRequireDefault(_ErrorTips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (!window.console) window.console = { log: function log() {}, error: function error() {}, debug: function debug() {}, info: function info() {} };
	
	var MSG = exports.MSG = message.MSG;
	var browser = exports.browser = __browser;
	var util = exports.util = __util;
	var dom = exports.dom = __dom;
	/**
	 * @param {options}
	 * @param options.owner {String} container id
	 * @param options.controls {Boolean} 是否显示原生控件
	 * @param options.volume {Number} 音量初始化，传0则静音
	 * @param options.listener {Function}
	 * @param options.poster {Object|String}
	 * @param options.m3u8 {Boolean}
	 * @param options.live {Boolean} 是否直播
	 * @param options.debug {Boolean} 是否调试状态
	 * @param options.flash {Boolean} 优先使用flash
	 * @param options.wording {Object} 自定义提示语
	 * @method currentTime
	 * @method duration
	 * @method buffered
	 * @class
	 */
	
	var Player = exports.Player = function () {
		function Player(options) {
			_classCallCheck(this, Player);
	
			this.options = options;
			var owner = options.owner;
			if (!owner) return console.error('Player need a container');
	
			this.guid = util.guid();
	
			this.listener = this.options.listener;
			message.sub('*', '*', util.bind(this, this.handleMsg), this);
	
			owner = dom.get(owner);
			this.render(owner);
		}
	
		Player.prototype.render = function render(owner) {
			var clsName = 'vcp-player';
			if (browser.TOUCH_ENABLED) clsName += ' touchable';
			this.el = dom.createEl('div', { 'class': clsName });
	
			this.options.flash = this.options.flash || browser.IS_IE; // IE 不支持MSE, 强制使用flash吧
			if (!this.options.flash && browser.HASVIDEO) {
				var h5 = new _H5Video2["default"](this);
				h5.render(this.el);
				this.video = h5;
			} else {
				var flash = new _FlashVideo2["default"](this);
				flash.render(this.el);
				this.video = flash;
			}
			if (!this.video) return console.error('create video failed');
	
			owner.appendChild(this.el);
	
			this.poster = new _Poster2["default"](this);
			this.poster.render(this.el);
	
			if (!this.options.controls) {
				this.bigplay = new _BigPlay2["default"](this);
				this.bigplay.render(this.el);
	
				this.panel = new _Panel2["default"](this);
				this.panel.render(this.el);
			}
	
			this.errortips = new _ErrorTips2["default"](this);
			this.errortips.render(this.el);
	
			this.loading = new _Loading2["default"](this);
			this.loading.render(this.el);
	
			this.options.width = this.options.width || owner.offsetWidth;
			this.options.height = this.options.height || owner.offsetHeight;
			this.size(this.options.width, this.options.height);
	
			this.setup();
		};
	
		/**
	  *
	  * @param mW
	  * @param mH
	  * @param style [String] fit | cover
	  */
	
	
		Player.prototype.size = function size(mW, mH, style) {
			style = style || 'cover';
			var percent = /^\d+\.?\d{0,2}%$/;
			var dW = void 0,
			    dH = void 0;
			if (percent.test(mW) || percent.test(mH)) {
				//百分数
				dW = mW;
				dH = mH;
			} else {
				var vW = this.video.videoWidth(),
				    vH = this.video.videoHeight();
	
				dW = mW;
				dH = mH;
				if (vW && vH) {
					var ratio = vW / vH;
					// console.log(ratio, vW, vH, mW, mH)
					if (style == 'fit') {
						dW = mW;
						dH = dW / ratio;
						if (dH > mH) {
							// 高度超出容器
							dW *= mH / dH;
							dH = mH;
						}
					}
				}
			}
	
			dW += percent.test(dW) ? '' : 'px';
			dH += percent.test(dH) ? '' : 'px';
			//console.log(dH);
			this.el.style.width = dW;
			this.el.style.height = dH;
	
			this.video.width(dW);
			this.video.height(dH);
	
			this.width = dW;
			this.height = dH;
		};
	
		Player.prototype.setup = function setup() {
			this.__handleEvent = util.bind(this, this.handleEvent);
		};
	
		Player.prototype.destroy = function destroy() {
			this.video && this.video.destroy();
			this.panel && this.panel.destroy();
			this.bigplay && this.bigplay.destroy();
			this.loading && this.loading.destroy();
			message.unsub('*', '*', this.handleMsg, this);
			this.video = this.panel = this.bigplay = this.loading = null;
		};
	
		Player.prototype.setListener = function setListener(listener) {
			this.listener = listener;
		};
	
		Player.prototype.handleEvent = function handleEvent(e) {
			switch (e.type) {
				case 'mousemove':
					// 播放时检测鼠标是否移动，如果移动则出现控制栏
					if (this.__lastmove && new Date() - this.__lastmove < 100) break;
	
					var self = this;
					this.__movecnt = this.__movecnt || 0;
					this.__movecnt++;
					if (this.__movecnt < 5) {
						setTimeout(function () {
							self.__movecnt = 0;
						}, 500);
						break;
					}
					this.__movecnt = 0;
	
					this.__lastmove = +new Date();
					clearTimeout(this.__moveid);
	
					self.panel && self.panel.show();
					this.__moveid = setTimeout(function () {
						self.playing() && self.panel && self.panel.hide();
					}, 3000);
					break;
			}
		};
	
		Player.prototype.handleMsg = function handleMsg(msg) {
			switch (msg.type) {
				case MSG.Play:
					if (!this.playing()) break;
	
					dom.addClass(this.el, 'vcp-playing');
					if (this.video.type() == util.VideoType.RTMP) {
						this.__wait = true;
						this.loading.show();
					}
	
					dom.on(this.el, 'mousemove', this.__handleEvent);
					break;
				case MSG.TimeUpdate:
					if (this.__wait) {
						this.__wait = false;
						this.loading.hide();
					}
					break;
				case MSG.Pause:
					dom.off(this.el, 'mousemove', this.__handleEvent);
	
					dom.removeClass(this.el, 'vcp-playing');
					break;
				case MSG.Ended:
					dom.off(this.el, 'mousemove', this.__handleEvent);
					this.panel && this.panel.show();
					dom.removeClass(this.el, 'vcp-playing');
					break;
				case MSG.MetaLoaded:
					if (this.options.autoplay && this.video.type() == util.VideoType.RTMP) {
						this.__wait = true;
						this.loading.show();
					} else {
						this.loading.hide();
					}
					this.size(this.options.width, this.options.height);
	
					break;
				case MSG.Seeking:
					this.loading.show();
					break;
				case MSG.Seeked:
					this.loading.hide();
					break;
				case MSG.FullScreen:
					var self = this;
					setTimeout(function () {
						// fix IE9 按esc toggle 时背景图片出不来
						dom.toggleClass(self.el, 'vcp-fullscreen', msg.detail.isFullscreen);
					}, 0);
					break;
				case MSG.Error:
					this.loading.hide();
					this.errortips.show(msg.detail);
					this.panel && this.panel.show();
					break;
			}
	
			if (!msg["private"] && this.listener) this.listener(msg);
		};
	
		Player.prototype.currentTime = function currentTime(time) {
			return this.video.currentTime(time);
		};
	
		Player.prototype.duration = function duration() {
			return this.video.duration();
		};
	
		Player.prototype.percent = function percent(p) {
			if (!this.video.duration()) return 0;
			if (!p) return this.video.currentTime() / this.video.duration();
			//console.log(parseInt(this.video.duration() * p), p);
			this.video.currentTime(this.video.duration() * p);
		};
	
		Player.prototype.buffered = function buffered() {
			if (!this.video.duration()) return 0;
			return this.video.buffered() / this.video.duration();
		};
	
		Player.prototype.pause = function pause() {
			this.video.pause();
		};
	
		Player.prototype.play = function play() {
			this.video.play();
		};
	
		Player.prototype.mute = function mute(muted) {
			return this.video.mute(muted);
		};
	
		Player.prototype.volume = function volume(p) {
			return this.video.volume(p);
		};
	
		Player.prototype.fullscreen = function fullscreen(enter) {
			return this.video.fullscreen(enter);
		};
	
		Player.prototype.load = function load(src, type) {
			this.loading.show();
			this.video.load(src, type);
		};
	
		Player.prototype.playing = function playing() {
			return this.video.playing();
		};
	
		return Player;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./vcplayer.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./vcplayer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".vcp-player {\r\n    position: relative;\r\n    z-index: 0;\r\n    font-family: Tahoma, '\\5FAE\\8F6F\\96C5\\9ED1', \\u5b8b\\u4f53,Verdana,Arial,sans-serif;\r\n    background-color: black;\r\n}\r\n.vcp-fullscreen.vcp-player, .vcp-fullscreen video {\r\n    width: 100%!important;\r\n    height: 100%!important;\r\n}\r\n/* 伪全屏 */\r\nbody.vcp-full-window {\r\n    width: 100%!important;\r\n    height: 100%!important;\r\n    overflow-y: auto;\r\n}\r\n.vcp-full-window .vcp-player {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n\r\n/* chrome flash 成功加载到DOM之前会闪白屏，所以加个黑屏遮一遮 */\r\n.vcp-pre-flash {\r\n    z-index: 1000; background: black; width: 100%; height: 100%; position: absolute; top: 0; left: 0;\r\n}\r\n.vcp-controls-panel {\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    font-size: 16px;\r\n    height: 3em;\r\n    z-index: 1000;\r\n}\r\n.vcp-panel-bg {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    background-color: rgb(36, 36, 36);\r\n    opacity: 0.8;\r\n    filter: alpha(opacity=80);\r\n    z-index: 1000;\r\n}\r\n\r\n.vcp-playtoggle {\r\n    cursor: pointer;\r\n    position: relative;\r\n    z-index: 1001;\r\n    width: 3em;\r\n    height: 100%;\r\n    float: left;\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/play_btn.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/play_btn.svg), none;\r\n}\r\n.vcp-playtoggle:hover, .vcp-playtoggle:focus {\r\n    background-color: slategray;\r\n    opacity: 0.9;\r\n    filter: alpha(opacity=90);\r\n}\r\n.touchable .vcp-playtoggle:hover {\r\n    background-color: transparent;\r\n    opacity: 1;\r\n}\r\n.vcp-playing .vcp-playtoggle {\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/stop_btn.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/stop_btn.svg), none;\r\n}\r\n.vcp-bigplay {\r\n    width: 100%;\r\n    height: 80%; /*会遮住原生控制栏*/\r\n    position: absolute;\r\n    background-color: white\\0;\r\n    filter: alpha(opacity=0); /*奇怪的IE8/9鼠标事件穿透*/\r\n    z-index: 1000;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.vcp-slider {\r\n    position: relative;\r\n    z-index: 1001;\r\n    float: left;\r\n    background: rgb(196, 196, 196);\r\n    height: 10px;\r\n    opacity: 0.8;\r\n    filter: alpha(opacity=80);\r\n    cursor: pointer;\r\n}\r\n.vcp-slider .vcp-slider-track {\r\n    width: 0;\r\n    height: 100%;\r\n    margin-top: 0;\r\n    opacity: 1;\r\n    filter: alpha(opacity=100);\r\n    background-color: dodgerblue; /*beautiful blue*/\r\n}\r\n.vcp-slider .vcp-slider-thumb {\r\n    cursor: pointer;\r\n    background-color: white;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    border-radius: 1em!important;\r\n    height: 10px;\r\n    margin-left: -5px;\r\n    width: 10px;\r\n}\r\n\r\n.vcp-slider-vertical {\r\n    position: relative;\r\n    width: 0.5em;\r\n    height: 8em;\r\n    top: -5.6em;\r\n    z-index: 1001;\r\n    background-color: rgb(28, 28, 28);\r\n    opacity: 0.9;\r\n    filter: alpha(opacity=90);\r\n    cursor: pointer;\r\n}\r\n.vcp-slider-vertical .vcp-slider-track {\r\n    background-color: rgb(18, 117, 207);\r\n    width: 0.5em;\r\n    height: 100%;\r\n    opacity: 0.8;\r\n    filter: alpha(opacity=80);\r\n}\r\n.vcp-slider-vertical .vcp-slider-thumb {\r\n    cursor: pointer;\r\n    position: absolute;\r\n    background-color: aliceblue;\r\n    width: 0.8em;\r\n    height: 0.8em;\r\n    border-radius: 0.8em!important;\r\n    margin-top: -0.4em;\r\n    top: 0;\r\n    left: -0.15em;\r\n}\r\n/* 时间线/进度条 */\r\n.vcp-timeline {\r\n    top: -10px;\r\n    left: 0;\r\n    height: 10px;\r\n    position: absolute;\r\n    z-index: 1001;\r\n    width: 100%;\r\n}\r\n.vcp-timeline .vcp-slider-thumb {\r\n    top: -4px;\r\n}\r\n.vcp-timeline .vcp-slider {\r\n    margin-top: 8px;\r\n    height: 2px;\r\n    width: 100%;\r\n}\r\n.vcp-timeline:hover .vcp-slider {\r\n    margin-top: 0;\r\n    height: 10px;\r\n}\r\n.vcp-timeline:hover .vcp-slider-thumb {\r\n    display: block;\r\n    width: 16px;\r\n    height: 16px;\r\n    top: -3px;\r\n    margin-left: -8px;\r\n}\r\n/* 时间展示 */\r\n.vcp-timelabel {\r\n    display: inline-block;\r\n    line-height: 3em;\r\n    height: 3em;\r\n    width: 3em;\r\n    float: left;\r\n    color: white;\r\n    padding: 0 9px;\r\n    z-index: 1001;\r\n    position: relative;\r\n}\r\n/* 音量控制 */\r\n.vcp-volume {\r\n    height: 3em;\r\n    width: 3em;\r\n    cursor: pointer;\r\n    position: relative;\r\n    z-index: 1001;\r\n    float: right;\r\n    background-color: transparent;\r\n    opacity: 0.9;\r\n    filter: alpha(opacity=90);\r\n}\r\n.vcp-volume-icon {\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/volume.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/volume.svg), none;\r\n    display: inline-block;\r\n    width: 3em;\r\n    height: 3em;\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n.vcp-volume-muted .vcp-volume-icon {\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/muted.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/muted.svg), none;\r\n}\r\n.vcp-volume .vcp-slider-vertical {\r\n    top: -8.4em;\r\n    left: 1em;\r\n    display: none;\r\n}\r\n.vcp-volume .vcp-slider-track {\r\n    position: absolute;\r\n    bottom: 0;\r\n}\r\n.vcp-volume:hover .vcp-slider-vertical {\r\n    display: block;\r\n}\r\n.vcp-volume .vcp-volume-bg {\r\n    height: 8.8em;\r\n    width: 2em;\r\n    position: absolute;\r\n    left: 0.25em;\r\n    top: -8.8em;\r\n    background: rgb(36,36,36);\r\n    display: none;\r\n}\r\n.vcp-volume:hover .vcp-volume-bg, .vcp-volume:hover .vcp-slider-vertical {\r\n    display: block;\r\n}\r\n/* 全屏控件 */\r\n.vcp-fullscreen-toggle {\r\n    position: relative;\r\n    width: 3em;\r\n    height: 3em;\r\n    float: right;\r\n    cursor: pointer;\r\n    z-index: 1001;\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/fullscreen.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/fullscreen.svg), none;\r\n}\r\n.vcp-fullscreen .vcp-fullscreen-toggle {\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/fullscreen_exit.png);\r\n    background-image: url(//imgcache.qq.com/open/qcloud/video/vcplayer/img/fullscreen_exit.svg), none;\r\n}\r\n\r\n.vcp-loading {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    margin-top: -3em;\r\n}\r\n\r\n.vcp-poster {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    overflow: hidden;\r\n    z-index: 1000;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: none;\r\n}\r\n.vcp-poster-pic {\r\n    position: relative;\r\n}\r\n\r\n.vcp-error-tips {\r\n    position: absolute;\r\n    z-index: 1001;\r\n    width: 100%;\r\n    height: 4.5em;\r\n    left: 0;\r\n    top: 50%;\r\n    color: orangered;\r\n    margin-top: -5.25em;\r\n    text-align: center;\r\n    display: none;\r\n}\r\n\r\n.vcp-clarityswitcher{\r\n    height: 3em;\r\n    width: 3em;\r\n    cursor: pointer;\r\n    position: relative;\r\n    z-index: 1001;\r\n    float: right;\r\n    background-color: transparent;\r\n    opacity: 0.9;\r\n}\r\n.vcp-vertical-switcher-container{\r\n    width: 3em;\r\n    position: absolute;\r\n    left: 0em;\r\n    bottom: 2.4em;\r\n    background: rgb(36,36,36);\r\n    display: none;\r\n}\r\n.vcp-vertical-switcher-current{\r\n    display: block;\r\n    color: #fff;\r\n    text-align: center;\r\n    line-height:3em;\r\n}\r\n.vcp-vertical-switcher-item{\r\n    display: block;\r\n    color: #fff;\r\n    text-align: center;\r\n    line-height:2em;\r\n}\r\n.vcp-vertical-switcher-item.current{\r\n    color: #888;\r\n}\r\n/* animations */\r\n@-webkit-keyframes fadeOut {\r\n    from {\r\n        opacity: 1;\r\n    }\r\n\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n@keyframes fadeOut {\r\n    from {\r\n        opacity: 1;\r\n    }\r\n\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n.fadeOut {\r\n    -webkit-animation: fadeOut ease 0.8s;\r\n    animation: fadeOut ease 0.8s;\r\n}\r\n\r\n@-webkit-keyframes fadeIn {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@keyframes fadeIn {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.fadeIn {\r\n    -webkit-animation: fadeIn ease 0.8s;\r\n    animation: fadeIn ease 0.8s;\r\n    animation-fill-mode: both;\r\n}", ""]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * @file browser.js
	 */
	var USER_AGENT = window.navigator.userAgent;
	var webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(USER_AGENT);
	var appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
	
	/*
	 * Device is an iPhone
	 *
	 * @type {Boolean}
	 * @constant
	 * @private
	 */
	var IS_IPAD = exports.IS_IPAD = /iPad/i.test(USER_AGENT);
	
	// The Facebook app's UIWebView identifies as both an iPhone and iPad, so
	// to identify iPhones, we need to exclude iPads.
	// http://artsy.github.io/blog/2012/10/18/the-perils-of-ios-user-agent-sniffing/
	var IS_IPHONE = exports.IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD;
	var IS_IPOD = exports.IS_IPOD = /iPod/i.test(USER_AGENT);
	var IS_IOS = exports.IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;
	
	var IOS_VERSION = exports.IOS_VERSION = function () {
		var match = USER_AGENT.match(/OS (\d+)_/i);
		if (match && match[1]) {
			return match[1];
		}
	}();
	
	var IS_ANDROID = exports.IS_ANDROID = /Android/i.test(USER_AGENT);
	var ANDROID_VERSION = exports.ANDROID_VERSION = function () {
		// This matches Android Major.Minor.Patch versions
		// ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
		var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
		    major,
		    minor;
	
		if (!match) {
			return null;
		}
	
		major = match[1] && parseFloat(match[1]);
		minor = match[2] && parseFloat(match[2]);
	
		if (major && minor) {
			return parseFloat(match[1] + '.' + match[2]);
		} else if (major) {
			return major;
		} else {
			return null;
		}
	}();
	// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
	var IS_OLD_ANDROID = exports.IS_OLD_ANDROID = IS_ANDROID && /webkit/i.test(USER_AGENT) && ANDROID_VERSION < 2.3;
	var IS_NATIVE_ANDROID = exports.IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;
	
	var IS_FIREFOX = exports.IS_FIREFOX = /Firefox/i.test(USER_AGENT);
	var IS_EDGE = exports.IS_EDGE = /Edge/i.test(USER_AGENT);
	var IS_CHROME = exports.IS_CHROME = !IS_EDGE && /Chrome/i.test(USER_AGENT);
	var IS_IE8 = exports.IS_IE8 = /MSIE\s8\.0/.test(USER_AGENT);
	var IS_IE9 = exports.IS_IE9 = /MSIE\s9\.0/.test(USER_AGENT);
	var IS_IE = exports.IS_IE = /MSIE\s([\d.]+)/.test(USER_AGENT);
	
	var TOUCH_ENABLED = exports.TOUCH_ENABLED = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
	var BACKGROUND_SIZE_SUPPORTED = exports.BACKGROUND_SIZE_SUPPORTED = 'backgroundSize' in document.createElement('video').style;
	var HASVIDEO = exports.HASVIDEO = !!document.createElement('video').canPlayType;
	
	var IS_X5TBS = exports.IS_X5TBS = /TBS\/\d+/i.test(USER_AGENT); // 仅X5内核
	var IS_MQQB = exports.IS_MQQB = !IS_X5TBS && /MQQBrowser\/\d+/i.test(USER_AGENT); // QQ 浏览器
	
	var IS_MOBILE = exports.IS_MOBILE = IS_ANDROID || IS_IOS;
	
	var IS_FILE_PROTOCOL = exports.IS_FILE_PROTOCOL = /file:/.test(location.protocol);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.on = on;
	exports.off = off;
	exports.createEl = createEl;
	exports.get = get;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	exports.hasClass = hasClass;
	exports.findElPosition = findElPosition;
	exports.getPointerPosition = getPointerPosition;
	exports.loadScript = loadScript;
	function on(elem, type, cb) {
		if (!elem) return console.warn('element not exists');
		if (elem.addEventListener) elem.addEventListener(type, cb, false);else if (elem.attachEvent) elem.attachEvent('on' + type, cb);
	
		return cb;
	}
	function off(elem, type, cb) {
		if (!elem) return console.warn('element not exists');
		if (elem.removeEventListener) elem.removeEventListener(type, cb, false);else if (elem.detachEvent) elem.detachEvent('on' + type, cb);
	}
	function createEl() {
		var tag = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
		var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		var el = document.createElement(tag);
		for (var k in attrs) {
			if (!attrs.hasOwnProperty(k)) continue;
	
			var attr = attrs[k];
			if (attr === null) el.removeAttribute(attr);else el.setAttribute(k, attr);
		}
		for (var _k in props) {
			if (!props.hasOwnProperty(_k)) continue;
	
			el[_k] = props[_k];
		}
		return el;
	}
	function get(id) {
		return document.getElementById(id);
	}
	function addClass(elem, classToAdd) {
		if (elem.classList) elem.classList.add(classToAdd);else if (!hasClass(elem, classToAdd)) elem.className = elem.className + ' ' + classToAdd;
	}
	function removeClass(elem, classToRemove) {
		if (elem.classList) elem.classList.remove(classToRemove);else elem.className = elem.className.replace(classRegExp(classToRemove), ' ');
	}
	function toggleClass(elem, classToToggle, assert) {
		assert ? addClass(elem, classToToggle) : removeClass(elem, classToToggle);
	}
	function hasClass(elem, classToCheck) {
		if (elem.classList) return elem.classList.contains(classToCheck);else return classRegExp(classToCheck).test(elem.className);
	}
	function classRegExp(className) {
		return new RegExp('(^|\\s)' + className + '($|\\s)');
	}
	/**
	 * Offset Left
	 * getBoundingClientRect technique from
	 * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
	 *
	 * @function findElPosition
	 * @param {Element} el Element from which to get offset
	 * @return {Object}
	 */
	function findElPosition(el) {
		var box = void 0;
	
		if (el.getBoundingClientRect && el.parentNode) {
			box = el.getBoundingClientRect();
		}
	
		if (!box) {
			return {
				left: 0,
				top: 0
			};
		}
	
		var docEl = document.documentElement;
		var body = document.body;
	
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;
		var scrollLeft = window.pageXOffset || body.scrollLeft;
		var left = box.left + scrollLeft - clientLeft;
	
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var scrollTop = window.pageYOffset || body.scrollTop;
		var top = box.top + scrollTop - clientTop;
	
		// Android sometimes returns slightly off decimal values, so need to round
		return {
			left: Math.round(left),
			top: Math.round(top)
		};
	}
	/**
	 * Get pointer position in element
	 * Returns an object with x and y coordinates.
	 * The base on the coordinates are the bottom left of the element.
	 *
	 * @function getPointerPosition
	 * @param {Element} el Element on which to get the pointer position on
	 * @param {Event} event Event object
	 * @return {Object} This object will have x and y coordinates corresponding to the mouse position
	 */
	function getPointerPosition(el, event, pos) {
		var position = {};
		var box = pos || findElPosition(el);
		var boxW = el.offsetWidth;
		var boxH = el.offsetHeight;
	
		var boxY = box.top;
		var boxX = box.left;
		var pageY = event.pageY || event.clientY;
		var pageX = event.pageX || event.clientX;
	
		if (event.changedTouches) {
			pageX = event.changedTouches[0].pageX;
			pageY = event.changedTouches[0].pageY;
		}
	
		position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
		position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));
	
		return position;
	}
	
	function loadScript(src, callback) {
		var tag = document.createElement("script");
	
		tag.onload = tag.onreadystatechange = function () {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				if (typeof callback == "function") {
					callback();
				}
				tag.onload = tag.onreadystatechange = null;
	
				if (tag.parentNode) {
					tag.parentNode.removeChild(tag);
				}
			}
		};
	
		tag.src = src;
		document.getElementsByTagName("head")[0].appendChild(tag);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.VideoType = exports.CDNPath = exports.FullscreenApi = undefined;
	exports.guid = guid;
	exports.bind = bind;
	exports.isEmpty = isEmpty;
	exports.covertTime = covertTime;
	exports.doFullscreen = doFullscreen;
	exports.extend = extend;
	exports.store = store;
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	var __guid = 1;
	function guid() {
		return __guid++;
	}
	
	function bind(context, fn, uid) {
		if (!fn.guid) fn.guid = guid();
	
		var ret = function ret() {
			fn.apply(context, arguments);
		};
		// 多实例会共享同一个原型方法，于是乎guid也会一样，所以再加个uid主动做区分
		ret.guid = uid ? uid + '_' + fn.guid : fn.guid;
		return ret;
	}
	
	function isEmpty(obj) {
		if (obj instanceof Array) return obj.length === 0;
	
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) return false;
		}return true;
	}
	
	function covertTime(s) {
		s = s | 0;
		var h = 3600,
		    m = 60;
		var hours = s / h | 0;
		var minutes = (s - hours * h) / m | 0; // 有个向下取整的效果
		var sec = s - hours * h - minutes * m;
	
		hours = hours > 0 ? hours + ':' : '';
		minutes = minutes > 0 ? minutes + ':' : hours > 0 ? '00:' : '';
		sec = sec > 0 ? sec + '' : '00';
	
		hours = hours.length == 2 ? '0' + hours : hours;
		minutes = minutes.length == 2 ? '0' + minutes : minutes;
		sec = sec.length == 1 ? '0' + sec : sec;
	
		return hours + minutes + sec;
	}
	
	var FullscreenApi = exports.FullscreenApi = { // 这么写只是为了IDE能检测到这些属性
		'requestFullscreen': null,
		'exitFullscreen': null,
		'fullscreenElement': null,
		'fullscreenEnabled': null,
		'fullscreenchange': null,
		'fullscreenerror': null
	};
	
	// browser API methods
	// map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
	var apiMap = [
	// Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
	['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
	// WebKit
	['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
	// Old WebKit (Safari 5.1)
	['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
	// Mozilla
	['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
	// Microsoft
	['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
	
	var specApi = apiMap[0];
	var browserApi = void 0;
	
	// determine the supported set of functions
	for (var i = 0; i < apiMap.length; i++) {
		// check for exitFullscreen function
		if (apiMap[i][1] in document) {
			browserApi = apiMap[i];
		}
	}
	
	// map the browser API names to the spec API names
	if (browserApi) {
		for (var _i = 0; _i < browserApi.length; _i++) {
			FullscreenApi[specApi[_i]] = browserApi[_i];
		}
	}
	function documentFullscreenChange(e) {
		doFullscreen.__isFullscreen = !!document[FullscreenApi.fullscreenElement]; // 取消全屏的时候返回的是null, 由此可判断全屏状态
	
		if (!doFullscreen.__isFullscreen) {
			dom.off(document, FullscreenApi.fullscreenchange, documentFullscreenChange);
		}
		message.pub({ type: _message.MSG.FullScreen, src: 'util', ts: e.timestamp, detail: { isFullscreen: doFullscreen.__isFullscreen } }, doFullscreen.player);
	}
	function onKeydown(event) {
		if (event.keyCode === 27) doFullscreen(doFullscreen.player, false);
	}
	function doFullscreen(player, enter, owner) {
		if (typeof enter === 'undefined') return doFullscreen.__isFullscreen || false;
	
		doFullscreen.player = player;
		if (FullscreenApi.requestFullscreen) {
			if (enter) {
				dom.on(document, FullscreenApi.fullscreenchange, documentFullscreenChange);
				owner && owner[FullscreenApi.requestFullscreen]();
			} else {
				document[FullscreenApi.exitFullscreen]();
			}
		} else {
			// 伪全屏,可以引导再按个F11
			doFullscreen.__isFullscreen = enter;
	
			if (doFullscreen.__isFullscreen) {
				doFullscreen.__origOverflow = document.documentElement.style.overflow;
				document.documentElement.style.overflow = 'hidden'; // hide any scroll bars
				dom.on(document, 'keydown', onKeydown);
			} else {
				document.documentElement.style.overflow = doFullscreen.__origOverflow;
				dom.off(document, 'keydown', onKeydown);
			}
	
			dom.toggleClass(document.body, 'vcp-full-window', enter);
			message.pub({ type: _message.MSG.FullScreen, src: 'util', detail: { isFullscreen: doFullscreen.__isFullscreen } }, doFullscreen.player);
		}
	}
	
	function extend(newObj) {
		for (var _len = arguments.length, oldObjs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			oldObjs[_key - 1] = arguments[_key];
		}
	
		for (var _i2 = 0; _i2 < oldObjs.length; _i2++) {
			var oldObj = oldObjs[_i2];
			for (var p in oldObj) {
				if (oldObj.hasOwnProperty(p)) newObj[p] = newObj[p] || oldObj[p];
			}
		}
	
		return newObj;
	}
	
	function store(key, value) {
		if (typeof value === 'undefined') return JSON.parse(localStorage[key] || 'null');
		localStorage[key] = JSON.stringify(value);
	}
	
	var CDNPath = exports.CDNPath = "//imgcache.qq.com/open/qcloud/video/vcplayer/";
	
	var VideoType = exports.VideoType = { RTMP: 'rtmp', M3U8: 'm3u8' };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.MSG = undefined;
	exports.pub = pub;
	exports.sub = sub;
	exports.unsub = unsub;
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	var MSG = exports.MSG = { Error: 'error', TimeUpdate: 'timeupdate', Load: 'load', MetaLoaded: 'loadedmetadata', Loaded: 'loadeddata', Progress: 'progress', FullScreen: 'fullscreen',
		Play: 'play', Pause: 'pause', Ended: 'ended', Seeking: 'seeking', Seeked: 'seeked', Resize: 'resize', VolumeChange: 'volumechange' };
	
	var Players = {};
	var fnCaches = {};
	
	function getListeners(scope) {
		var guid = scope.guid;
		if (!guid) {
			console.error(scope, ' has no guid.');
			return {};
		}
		Players[guid] = Players[guid] || {};
		return Players[guid];
	}
	function getFnCache(scope) {
		var guid = scope.guid;
		if (!guid) {
			console.error(scope, ' has no guid.');
			return {};
		}
		fnCaches[guid] = fnCaches[guid] || {};
		return fnCaches[guid];
	}
	/**
	 * 发布事件
	 * @param msg {Object}
	 * @param msg.type 事件类型，sliderchange, play, stop等
	 * @param msg.src 触发事件的对象(Component实例)，直接传源对象，会与sub时填入的target作对比
	 * @param msg.ts 触发时间戳
	 * @param msg.private 是否私有事件，私有事件会在Player接口对外回调时劫断消息
	 * @param msg.detail
	 * @param scope 区分多个Player实例
	 */
	function pub(msg, scope) {
		doPub(msg.type, msg, scope);
		doPub('*', msg, scope);
	}
	function doPub(type, msg, scope) {
		try {
			var listeners = getListeners(scope);
			var fnCache = getFnCache(scope);
	
			if (!listeners[type]) return;
	
			var fnObjs = listeners[type];
			for (var guid in fnObjs) {
				if (!fnObjs.hasOwnProperty(guid)) continue;
				var targets = fnObjs[guid];
				var fn = fnCache[guid];
				if (!(typeof fn === 'function')) return false;
				for (var i = 0; i < targets.length; i++) {
					var target = targets[i];
					if (target === '*' || target === msg.src) fn(msg);
				}
			}
		} catch (e) {
			window.console && console.error && console.error(e.stack || e);
		}
	}
	/**
	 * sub(*, *, cb) 任意来源的任意事件
	 * sub('play', *, cb) 任意来源的play事件
	 * sub('play', obj, cb) 只订阅指定obj的play事件
	 * sub(*, obj, cb) 接收指定obj的任意事件
	 * @param type 指定订阅消息类型
	 * @param target 指定消息源目标，其实可以为任意对象，只要src能匹配即可
	 * @param cb {Function}
	 * @param cb.guid
	 * @param scope 区分多个Player实例
	 * @returns {*}
	 */
	function sub(type, target, cb, scope) {
		var listeners = getListeners(scope);
		var fnCache = getFnCache(scope);
	
		if (!cb.guid) return console.error('callback function need guid');
		fnCache[cb.guid] = cb;
	
		listeners[type] = listeners[type] || {};
		listeners[type][cb.guid] = listeners[type][cb.guid] || [];
		listeners[type][cb.guid].push(target);
	
		return cb;
	}
	
	/**
	 * unsub 卸载消息订阅函数
	 * @param type 可指定类型，也可不指定类型(*)
	 * @param target 可指定目标，也可不指定(*)
	 * @param cb {Function|String} * 则删除全部
	 * @param cb.guid 回调函数的唯一标识
	 * @param scope 区分多个Player实例
	 */
	function unsub(type, target, cb, scope) {
		var listeners = getListeners(scope);
		var fnCache = getFnCache(scope);
	
		if (type != '*' && !listeners[type]) return;
		if (type != '*' && !listeners[type][cb.guid]) return;
	
		for (var t in listeners) {
			if (type !== '*' && t != type) continue; // 没有指定具体事件类型，那就要遍历找到挂载的函数，再删除
	
			if (!listeners.hasOwnProperty(t)) continue;
			if (cb === '*') {
				for (var id in listeners[t]) {
					delete fnCache[id];
				}delete listeners[t];
				continue;
			}
			var targets = listeners[t][cb.guid];
			if (target === '*') targets = [];
	
			for (var i = 0; i < targets.length;) {
				if (targets[i] === target) targets.splice(i, 1);else i++;
			}
	
			if (targets.length == 0) {
				delete listeners[t][cb.guid];
				// delete fnCache[cb.guid];
			}
			if (util.isEmpty(listeners[t])) delete listeners[t];
		}
		// console.log(arguments, JSON.stringify(fnCache), JSON.stringify(listeners))
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	var _message = __webpack_require__(10);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var fsApi = util.FullscreenApi;
	
	var H5Video = function (_Component) {
		_inherits(H5Video, _Component);
	
		function H5Video(player) {
			_classCallCheck(this, H5Video);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'H5Video'));
		}
	
		H5Video.prototype.render = function render(owner) {
			var options = this.player.options;
			var controls = !options.controls ? null : options.controls;
			var autoplay = options.autoplay ? true : null;
			this.createEl('video', {
				controls: controls,
				preload: 'auto',
				autoplay: autoplay,
				'webkit-playsinline': true,
				'playsinline': true,
				'x-webkit-airplay': true
			});
			return _Component.prototype.render.call(this, owner);
		};
	
		H5Video.prototype.__hlsLoaded = function __hlsLoaded(src) {
			if (!Hls.isSupported()) return this.notify({ type: 'error', code: 4 });
			var hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(this.el);
		};
	
		H5Video.prototype.setup = function setup() {
			var events = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadedmetadata', 'loadeddata', 'loadstart', 'pause', 'play', 'playing', 'timeline', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
			this.__timebase = +new Date();
			this.on(_message.MSG.MetaLoaded, this.notify);
			this.on(_message.MSG.Loaded, this.notify);
			this.on(_message.MSG.Progress, this.notify);
			this.on(_message.MSG.Play, this.notify);
			this.on(_message.MSG.Pause, this.notify);
			this.on(_message.MSG.Error, this.notify);
			this.on(_message.MSG.TimeUpdate, this.notify);
			this.on(_message.MSG.Ended, this.notify);
			this.on(_message.MSG.Seeking, this.notify);
			this.on(_message.MSG.Seeked, this.notify);
			this.on(_message.MSG.VolumeChange, this.notify);
			this.on('durationchange', this.notify);
	
			this.load(this.options.src, this.options.m3u8 ? util.VideoType.M3U8 : '');
		};
	
		H5Video.prototype.notify = function notify(e) {
			var msg = { type: e.type, src: this, ts: e.timeStamp };
	
			switch (e.type) {
				case _message.MSG.MetaLoaded:
					this.__timebase = +new Date() - msg.ts;
					break;
				case _message.MSG.Error:
					var Props = { 1: 'MEDIA_ERR_ABORTED', 2: 'MEDIA_ERR_DECODE', 3: 'MEDIA_ERR_NETWORK', 4: 'MEDIA_ERR_SRC_NOT_SUPPORTED' };
					msg.detail = this.el && this.el.error || { code: e.code };
					msg.detail.reason = Props[msg.detail.code];
					break;
				case _message.MSG.Ended:
					this.pause(); // IE9 不会自动改变播放状态，导致伪全屏的时候出现黑屏
					break;
				case 'durationchange':
					if (this.videoHeight() != 0) msg.type = _message.MSG.Resize;
					break;
			}
	
			this.pub(msg);
		};
	
		H5Video.prototype.videoWidth = function videoWidth() {
			return this.el.videoWidth;
		};
	
		H5Video.prototype.videoHeight = function videoHeight() {
			return this.el.videoHeight;
		};
	
		H5Video.prototype.width = function width(w) {
			if (!w) return this.el.width;else this.el.style.width = w;
		};
	
		H5Video.prototype.height = function height(h) {
			if (!h) return this.el.height;else this.el.style.height = h;
		};
	
		H5Video.prototype.play = function play() {
			this.el.play();
		};
	
		H5Video.prototype.pause = function pause() {
			this.el.pause();
		};
	
		H5Video.prototype.stop = function stop() {
			this.el.stop();
		};
	
		H5Video.prototype.paused = function paused() {
			return this.el.paused;
		};
	
		H5Video.prototype.buffered = function buffered() {
			if (this.el.buffered.length >= 1) return this.el.buffered.end(this.el.buffered.length - 1);else return 0;
		};
	
		H5Video.prototype.currentTime = function currentTime(time) {
			if (typeof time === 'undefined') return this.el.currentTime;
	
			return this.el.currentTime = time;
		};
	
		H5Video.prototype.duration = function duration() {
			return this.el.duration || 0;
		};
	
		H5Video.prototype.mute = function mute(muted) {
			if (typeof muted === 'undefined') return this.el.muted;else return this.el.muted = muted;
		};
	
		H5Video.prototype.volume = function volume(p) {
			if (typeof p === 'undefined') return this.el.volume;
			if (p < 0) p = 0;
			if (p > 1) p = 1;
			return this.el.volume = p;
		};
	
		H5Video.prototype.fullscreen = function fullscreen(enter) {
			return util.doFullscreen(this.player, enter, this.owner);
		};
	
		H5Video.prototype.load = function load(src, type) {
			this.pub({ type: _message.MSG.Load, src: this, ts: +new Date() - this.__timebase, detail: { src: src, type: type } });
			var isM3u8 = src.indexOf('.m3u8') > -1 || type == util.VideoType.M3U8;
			var canPlayHLS = isM3u8 && this.el.canPlayType('application/x-mpegurl') == 'maybe';
			if (isM3u8 && !canPlayHLS) {
				this.__type = util.VideoType.M3U8;
				var self = this;
				if (typeof window.Hls == 'undefined') dom.loadScript(util.CDNPath + 'libs/hls.js', function () {
					self.__hlsLoaded.call(self, src);
				});else this.__hlsLoaded(src);
			} else {
				this.__type = type;
				this.el.src = src;
			}
		};
	
		H5Video.prototype.playing = function playing() {
			return !this.el.paused;
		};
	
		H5Video.prototype.type = function type() {
			return this.__type;
		};
	
		return H5Video;
	}(_Component3["default"]);
	
	exports["default"] = H5Video;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _browser = __webpack_require__(7);
	
	var browser = _interopRequireWildcard(_browser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @param {Player} player
	 * @param {Object} options
	 * @property {Number} guid
	 * @property {String} name
	 * @property {String} type
	 * @method render
	 * @method createEl
	 * @method {Function} on 添加监听
	 * @method {Function} off 卸载监听
	 * @method sub
	 * @method pub
	 * @method unsub
	 * @class Component
	 */
	
	var Component = function () {
		function Component(player, name) {
			_classCallCheck(this, Component);
	
			this.name = name;
			this.player = player;
			this.options = player.options;
			this.fnCache = {};
			this.guid = util.guid();
		}
	
		Component.prototype.createEl = function createEl(tag, attrs, props) {
			return this.el = dom.createEl(tag, attrs, props);
		};
	
		Component.prototype.render = function render(owner) {
			if (owner && this.el) {
				this.owner = owner;
				owner.appendChild(this.el);
				this.setup();
			}
	
			return this.el;
		};
	
		Component.prototype.on = function on(el, type, fn) {
			if (typeof el === 'string') {
				fn = type;
				type = el;
				el = this.el;
			}
			if (browser.IS_MOBILE && type == 'click') type = 'touchend';
			this.cbs = this.cbs || {};
	
			// 同个类的成员方法在不同实例中，guid仍然相同, 所以再加个对象guid加以区分
			var guid = getFnGuid(this.guid, fn);
			var firstInstance = !guid;
			var firstUsed = guid && !this.fnCache[guid];
			if (firstInstance || firstUsed) {
				fn = util.bind(this, fn, this.guid);
				this.fnCache[fn.guid] = fn;
				guid = fn.guid;
			} else {
				fn = this.fnCache[guid];
			}
	
			dom.on(el, type, fn);
			// todo 最好计算个hash来唯一确定不同元素不同事件的不同函数，先这样子搞吧
			this.cbs[fnHash(guid, type)] = { guid: guid, el: el, type: type };
			return fn;
		};
	
		Component.prototype.off = function off(el, type, fn) {
			if (typeof el === 'string') {
				fn = type;
				type = el;
				el = this.el;
			}
			if (browser.IS_MOBILE && type == 'click') type = 'touchend';
			var guid = getFnGuid(this.guid, fn);
	
			if (this.fnCache[guid]) fn = this.fnCache[guid];
	
			dom.off(el, type, fn);
			delete this.cbs[fnHash(guid, type)];
		};
	
		Component.prototype.pub = function pub(msg) {
			var self = this;
			setTimeout(function () {
				message.pub(msg, self.player);
			}, 0);
		};
	
		Component.prototype.sub = function sub(type, target, cb) {
			message.sub(type, target, cb, this.player);
		};
	
		Component.prototype.unsub = function unsub(type, target, cb) {
			message.unsub(type, target, cb, this.player);
		};
	
		Component.prototype.handleMsg = function handleMsg() {};
	
		Component.prototype.setup = function setup() {};
	
		Component.prototype.destroy = function destroy() {
			if (this.handleMsg) this.unsub('*', '*', this.handleMsg);
	
			if (!this.cbs) return;
			for (var hash in this.cbs) {
				if (!this.cbs.hasOwnProperty(hash)) continue;
				var cb = this.cbs[hash];
				dom.off(cb.el, cb.type, this.fnCache[cb.guid]);
				delete this.cbs[hash];
			}
			this.fnCache = null;
			this.cbs = null;
	
			try {
				this.el.parentNode.removeChild(this.el);
			} catch (e) {}
		};
	
		return Component;
	}();
	
	exports["default"] = Component;
	
	
	function fnHash(guid, type) {
		return type + '_' + guid;
	}
	function getFnGuid(objGuid, fn) {
		if (fn.guid && String(fn.guid).indexOf('_') == -1) // 没有传bind方法进来，包装下
			return objGuid + '_' + fn.guid;
		return fn.guid;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _message = __webpack_require__(10);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var State = { Playing: 'PLAYING', Paused: 'PAUSED', Stop: 'STOP', Seeking: 'SEEKING', Seeked: 'SEEKED' };
	/**
	 *
	 * @class FlashVideo
	 */
	
	var FlashVideo = function (_Component) {
		_inherits(FlashVideo, _Component);
	
		function FlashVideo(player) {
			_classCallCheck(this, FlashVideo);
	
			var _this = _possibleConstructorReturn(this, _Component.call(this, player, 'FlashVideo'));
	
			var flashCBName = 'vcpFlashCB_' + _this.guid;
			_this.__flashCB = flashCBName;
			if (!window[flashCBName]) {
				/**
	    *
	    * @param eventName
	    * @param args
	    * @param args.objectID 每个flash播放器的id
	    */
				window[flashCBName] = function (eventName, args) {
					args = args && args[0];
					var fn = window[flashCBName].fnObj && window[flashCBName].fnObj[args.objectID];
					fn && fn(eventName, args);
				};
				window[flashCBName].fnObj = {};
			}
			return _this;
		}
	
		FlashVideo.prototype.render = function render(owner) {
			this.__timebase = +new Date();
	
			var swfurl = '//imgcache.qq.com/open/qcloud/video/player/release/QCPlayer.swf';
			// swfurl = 'http://test.qzs.qq.com/iot/demo/player/QCPlayer.swf';
			var options = this.player.options;
			var wmode = 'opaque';
			var id = 'obj_vcplayer_' + this.player.guid;
			var flashCBName = this.__flashCB;
			this.__id = id;
			owner.innerHTML = '\n\t\t<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="' + id + '" width="100%" height="100%">\n            <param name="movie"  value="' + swfurl + '" />\n            <param name="quality" value="autohigh" />\n            <param name="swliveconnect" value="true" />\n            <param name="allowScriptAccess" value="always" />\n            <param name="bgcolor" value="#000" />\n            <param name="allowFullScreen" value="true" />\n            <param name="wmode" value="' + wmode + '" />\n            <param name="FlashVars" value="cbName=' + flashCBName + '" />\n\n            <embed src="' + swfurl + '" width="100%" height="100%" name="' + id + '"\n                   quality="autohigh"\n                   bgcolor="#000"\n                   align="middle" allowFullScreen="true"\n                   allowScriptAccess="always"\n                   type="application/x-shockwave-flash"\n                   swliveconnect="true"\n                   wmode="' + wmode + '"\n                   FlashVars="cbName=' + flashCBName + '"\n                   pluginspage="http://www.macromedia.com/go/getflashplayer" >\n            </embed>\n        </object>\n\t\t';
			this.owner = owner;
			this.cover = dom.createEl('div', { 'class': 'vcp-pre-flash' });
			this.owner.appendChild(this.cover);
	
			window[this.__flashCB].fnObj[this.__id] = util.bind(this, this.notify);
		};
	
		FlashVideo.prototype.setup = function setup() {
			this.on('error', this.notify);
		};
	
		FlashVideo.prototype.doPolling = function doPolling() {
			if (this.options.live) return; // 直播没必要这个事件
			clearInterval(this.__timer);
			this.__timer = setInterval(this.interval.bind(this), 1000);
		};
	
		FlashVideo.prototype.endPolling = function endPolling() {
			clearInterval(this.__timer);
		};
	
		FlashVideo.prototype.interval = function interval() {
			var info;
			try {
				info = this.el.getState();
			} catch (e) {
				this.endPolling(); // 多次load会导致interval非正常结束，于是一直polling
				return;
			}
			if (this.__m3u8) {
				var tmp = this.currentTime() + info.bufferLength;
				if (this.__buffered !== tmp) {
					this.__buffered = tmp;
					this.pub({ type: _message.MSG.Progress, src: this, ts: new Date() - this.__timebase });
				}
	
				if (this.__buffered >= this.duration()) // 允许一定误差
					this.endPolling();
			} else if (!this.__rtmp) {
				if (this.__bytesloaded != info.bytesLoaded) {
					this.__bytesloaded = info.bytesLoaded;
					this.pub({ type: _message.MSG.Progress, src: this, ts: new Date() - this.__timebase });
				}
				if (this.__bytesloaded >= this.__bytesTotal) this.endPolling();
			}
		};
	
		FlashVideo.prototype.destroy = function destroy() {
			delete window[this.__flashCB].fnObj[this.__id];
			this.endPolling();
			_Component.prototype.destroy.call(this);
		};
		/**
	  *
	  * @param eventName
	  * @param info
	  * @property info.bytesLoaded
	  * @property info.bytesTotal
	  * @property info.playState
	  * @property info.seekState
	  * @property info.bufferLength
	  * @property info.backBufferLength
	  * @property info.code
	  * @property info.msg
	  */
	
	
		FlashVideo.prototype.notify = function notify(eventName, info) {
			var e = { type: eventName, ts: +new Date() - this.__timebase };
			try {
				// if (eventName == 'playState' && !this.__metaloaded && this.playing()) { // 一些rtmp推流客户端没有metaData事件，所以自己发
				// 	this.notify('metaData', {});
				// }
	
				if (this.options.debug) {
					this.pub({ type: e.type, src: this, ts: e.ts, detail: util.extend({ debug: true }, info) });
				}
	
				if (this.__m3u8 && !this.__metaloaded && eventName == 'mediaTime' && info.videoWidth != 0) {
					// 修正flash m3u8的metaData时机
					e.type = 'metaData';
					this.__metaloaded = true;
				}
	
				switch (e.type) {
					case 'ready':
						this.el = getFlashMovieObject(this.__id);
						this.setup();
						// this.el.setAutoPlay();
						this.__timebase = new Date() - info.time;
						this.load(this.options.src);
						return;
						break;
					case 'metaData':
						e.type = _message.MSG.MetaLoaded;
						this.__videoWidth = info.videoWidth;
						this.__videoHeight = info.videoHeight;
						this.__duration = info.duration;
						this.__bytesTotal = info.bytesTotal;
						this.__prevPlayState = null;
						this.__m3u8 = info.type === util.VideoType.M3U8;
						this.__rtmp = info.type === util.VideoType.RTMP;
						this.__type = info.type;
						if (this.__m3u8) {
							this.volume(0);
							this.__metaloaded = this.__videoWidth != 0;
							if (!this.__metaloaded) return; // m3u8 没有播放的话是拿不到视频宽高的
						}
						!this.options.autoplay && this.pause();
						this.__metaloaded = true;
	
						this.doPolling();
	
						var self = this;
						if (!self.cover) break;
						setTimeout(function () {
							self.owner.removeChild(self.cover); // faded out?
							self.cover = null;
						}, 500);
						break;
	
					case 'playState':
						if (info.playState == State.Playing) {
							this.__playing = true;
							this.__stopped = false;
							e.type = _message.MSG.Play;
						} else if (info.playState == State.Paused) {
							this.__playing = false;
							this.__stopped = false;
							e.type = _message.MSG.Pause;
						} else if (info.playState == State.Stop) {
							this.__playing = false;
							this.__stopped = true;
							e.type = _message.MSG.Ended;
							this.__prevPlayState = null;
						} else {
							return;
						}
						break;
					case 'seekState':
						if (!this.__metaloaded) return;
	
						if (info.seekState == State.Seeking) {
							e.type = _message.MSG.Seeking;
						} else if (info.seekState == State.Seeked) {
							if (!this.__m3u8 // m3u8倒没有这个问题
							 && info.playState == State.Paused || info.playState == State.Stop // 播放结束后seek状态不变更，所以强制play以恢复正常状态
							) {
									this.play();
									this.__prevPlayState = info.playState;
								}
	
							e.type = _message.MSG.Seeked;
						} else {
							return;
						}
						break;
					case 'netStatus':
						if (!this.options.live) {
							if (info.code == 'NetStream.Buffer.Full') {
								if (this.__prevPlayState == State.Paused || this.__prevPlayState == State.Stop) {
									this.pause();
								}
								this.__prevPlayState = null;
								e.type = _message.MSG.Seeked;
							} else if (info.code == 'NetStream.Seek.Complete') {
								// 播放到结尾再点播放会自动停止,所以force play again
								this.play();
								break;
							}
						}
						// todo empty
						if (info.code == 'NetConnection.Connect.Closed') {
							e.type = 'error';
							info = { code: 1001, reason: info.code };
						}
						break;
					case 'mediaTime':
						this.__videoWidth = info.videoWidth;
						this.__videoHeight = info.videoHeight;
						e.type = _message.MSG.TimeUpdate;
						break;
					case 'error':
						//console.log('error', info, info.code == "NetStream.Seek.InvalidTime");
						if (info.code == "NetStream.Seek.InvalidTime") {
							this.currentTime(info.details);
							return false; // adobe's bug, ignore
						}
	
						var code = isNaN(parseInt(info.code)) ? 1002 : info.code;
						var reason = isNaN(parseInt(info.code)) ? info.code : info.msg;
						var realCode = reason.match(/#(\d+)/); // example: Cannot load M3U8: crossdomain access denied:Error #2048
						if (realCode && realCode[1]) code = realCode[1];
						info = { code: code, reason: reason || '' };
						break;
				}
	
				var keepPrivate = eventName == 'printLog' || eventName == 'canPlay';
				!keepPrivate && this.pub({ type: e.type, src: this, ts: e.ts, detail: info });
			} catch (err) {
				console.error(eventName + ' ' + e.type, err);
			}
		};
	
		FlashVideo.prototype.handleMsg = function handleMsg(msg) {};
	
		FlashVideo.prototype.videoWidth = function videoWidth() {
			return this.__videoWidth;
		};
	
		FlashVideo.prototype.videoHeight = function videoHeight() {
			return this.__videoHeight;
		};
	
		FlashVideo.prototype.width = function width(w) {
			if (typeof w === 'undefined') return this.el && this.el.width;
			w = '100%';
			return this.el && (this.el.width = w);
		};
	
		FlashVideo.prototype.height = function height(h) {
			if (typeof h === 'undefined') return this.el && this.el.height;
			h = '100%';
			return this.el && (this.el.height = h);
		};
	
		FlashVideo.prototype.play = function play() {
			if (this.__stopped) this.currentTime(0);
			this.el.playerResume();
		};
	
		FlashVideo.prototype.pause = function pause() {
			this.el.playerPause();
		};
	
		FlashVideo.prototype.stop = function stop() {
			this.el.playerStop();
		};
	
		FlashVideo.prototype.paused = function paused() {
			return !this.__playing;
		};
	
		FlashVideo.prototype.buffered = function buffered() {
			var p;
			if (this.__m3u8) {
				return this.__buffered || 0;
			} else {
				p = (this.__bytesloaded || 0) / (this.__bytesTotal || 1);
				return this.duration() * p;
			}
		};
	
		FlashVideo.prototype.currentTime = function currentTime(time) {
			if (typeof time === 'undefined') return this.el.getPosition();
			this.el.playerSeek(time);
		};
	
		FlashVideo.prototype.duration = function duration() {
			return this.__duration;
		};
	
		FlashVideo.prototype.mute = function mute(muted) {
			if (typeof muted === 'undefined') return this.volume() == 0;
			this.volume(muted ? 0 : this.__lastVol);
		};
	
		FlashVideo.prototype.volume = function volume(p) {
			if (typeof p === 'undefined') return this.el && this.el.getState().volume;
			this.el && this.el.playerVolume(p);
			p != 0 && (this.__lastVol = p);
			this.pub({ type: _message.MSG.VolumeChange, src: this, ts: new Date() - this.__timebase });
		};
	
		FlashVideo.prototype.fullscreen = function fullscreen(enter) {
			return util.doFullscreen(this.player, enter, this.owner);
		};
	
		FlashVideo.prototype.load = function load(src, type) {
			this.pub({ type: _message.MSG.Load, src: this, ts: new Date() - this.__timebase, detail: { src: src, type: type } });
			this.el && this.el.playerLoad(src);
		};
	
		FlashVideo.prototype.playing = function playing() {
			return this.el && this.el.getState && this.el.getState().playState === State.Playing;
		};
	
		FlashVideo.prototype.type = function type() {
			return this.__type;
		};
	
		return FlashVideo;
	}(_Component3["default"]);
	
	/**
	 *
	 * @param movieName
	 * @returns {Object} el
	 * @property {Function} el.getDuration
	 * @property {Function} el.getPosition
	 * @property {Function} el.playerPlay
	 * @property {Function} el.playerResume
	 * @property {Function} el.playerPause
	 * @property {Function} el.setAutoPlay
	 * @property {Function} el.playerLoad
	 * @property {Function} el.getbufferLength
	 * @property {Function} el.playerSeek
	 * @property {Function} el.playerVolume
	 * @property {Function} el.playerStop
	 * @property {Function} el.getPlayState
	 * @property {Function} el.getState
	 */
	
	
	exports["default"] = FlashVideo;
	function getFlashMovieObject(movieName) {
		if (window.document[movieName]) {
			return window.document[movieName];
		}
		if (navigator.appName.indexOf("Microsoft Internet") == -1) {
			if (document.embeds && document.embeds[movieName]) return document.embeds[movieName];
		} else {
			return document.getElementById(movieName);
		}
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _PlayToggle = __webpack_require__(15);
	
	var _PlayToggle2 = _interopRequireDefault(_PlayToggle);
	
	var _FullscreenToggle = __webpack_require__(16);
	
	var _FullscreenToggle2 = _interopRequireDefault(_FullscreenToggle);
	
	var _Slider = __webpack_require__(17);
	
	var _Timeline = __webpack_require__(18);
	
	var _Timeline2 = _interopRequireDefault(_Timeline);
	
	var _Timelabel = __webpack_require__(19);
	
	var _Timelabel2 = _interopRequireDefault(_Timelabel);
	
	var _Volume = __webpack_require__(20);
	
	var _Volume2 = _interopRequireDefault(_Volume);
	
	var _ClaritySwitcher = __webpack_require__(21);
	
	var _ClaritySwitcher2 = _interopRequireDefault(_ClaritySwitcher);
	
	var _message = __webpack_require__(10);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	var _browser = __webpack_require__(7);
	
	var B = _interopRequireWildcard(_browser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 *
	 * @property {Timeline} timeline
	 * @property {Volume} volume
	 * @property {FullscreenToggle} fullscreen
	 * @property {Player} player
	 */
	
	var Panel = function (_Component) {
		_inherits(Panel, _Component);
	
		function Panel(player) {
			_classCallCheck(this, Panel);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'Panel'));
		}
	
		Panel.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-controls-panel' });
			this.el.appendChild(dom.createEl('div', { 'class': 'vcp-panel-bg' }));
			this.playToggle = new _PlayToggle2["default"](this.player);
			this.playToggle.render(this.el);
	
			this.timelabel = new _Timelabel2["default"](this.player);
			this.timelabel.render(this.el);
	
			this.timeline = new _Timeline2["default"](this.player);
			this.timeline.render(this.el);
	
			if (!B.IS_X5TBS) {
				this.fullscreen = new _FullscreenToggle2["default"](this.player);
				this.fullscreen.render(this.el);
			}
	
			if (!B.IS_MOBILE) {
				this.volume = new _Volume2["default"](this.player);
				this.volume.render(this.el);
			}
	
			if (this.options.videoSource && this.options.videoSource.definitions.length > 1 && !B.IS_MOBILE) {
				this.claritySwitcher = new _ClaritySwitcher2["default"](this.player);
				this.claritySwitcher.render(this.el);
			}
	
			return _Component.prototype.render.call(this, owner);
		};
	
		Panel.prototype.setup = function setup() {
			// add play toggle, progress, time label, volume/mute, fullscreen
			var handler = util.bind(this, this.handleMsg);
			// todo 可以批量添加事件
			this.sub(_Slider.MSG.Changing, this.volume, handler);
			this.sub(_Slider.MSG.Changed, this.timeline.progress, handler);
			this.sub(_message.MSG.TimeUpdate, this.player.video, handler);
			this.sub(_message.MSG.Progress, this.player.video, handler);
			this.sub(_message.MSG.MetaLoaded, this.player.video, handler);
			this.sub(_message.MSG.Pause, this.player.video, handler);
			this.sub(_message.MSG.Play, this.player.video, handler);
			this.sub(_message.MSG.Ended, this.player.video, handler);
		};
	
		Panel.prototype.handleMsg = function handleMsg(msg) {
			switch (msg.type) {
				case _message.MSG.MetaLoaded:
					this.timeline.percent(this.player.percent());
					this.timeline.buffered(this.player.buffered());
					this.player.volume(typeof this.options.volume === 'undefined' ? 0.5 : this.options.volume);
					!this.options.autoplay && this.show();
					break;
				case _message.MSG.TimeUpdate:
					if (!this.timeline.scrubbing) this.timeline.percent(this.player.percent());
					break;
				case _message.MSG.Pause:
					this.show();
					break;
				case _message.MSG.Play:
					this.hide();
					break;
				case _message.MSG.Progress:
					this.timeline.buffered(this.player.buffered()); // todo IE9 会最后一段时间就不触发progress了
					break;
				case _Slider.MSG.Changed:
					if (msg.src === this.timeline.progress) {
						this.player.percent(this.timeline.percent());
					}
					break;
				case _message.MSG.Ended:
					this.show();
					break;
			}
		};
	
		Panel.prototype.toggle = function toggle() {
			if (this.el.style.display === 'block') this.hide();else this.show();
		};
	
		Panel.prototype.show = function show() {
			if (this.el.style.display === 'block') return;
	
			dom.removeClass(this.el, 'fadeOut');
			dom.addClass(this.el, 'fadeIn');
			var self = this;
			setTimeout(function () {
				self.el.style.display = "block";
			}, 500);
		};
	
		Panel.prototype.hide = function hide() {
			dom.removeClass(this.el, 'fadeIn');
			dom.addClass(this.el, 'fadeOut');
			var self = this;
			setTimeout(function () {
				self.el.style.display = "none";
			}, 500);
		};
	
		return Panel;
	}(_Component3["default"]);
	
	exports["default"] = Panel;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayToggle = function (_Component) {
		_inherits(PlayToggle, _Component);
	
		function PlayToggle(player) {
			_classCallCheck(this, PlayToggle);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'PlayToggle'));
		}
	
		PlayToggle.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-playtoggle' });
	
			return _Component.prototype.render.call(this, owner);
		};
	
		PlayToggle.prototype.setup = function setup() {
			this.on('click', this.onClick);
			// this.sub('play', this.player.video, util.bind(this, this.handleMsg));
			// this.sub('pause', this.player.video, util.bind(this, this.handleMsg));
		};
	
		PlayToggle.prototype.onClick = function onClick() {
			var video = this.player.video;
			if (video.paused()) video.play();else video.pause();
		};
	
		PlayToggle.prototype.handleMsg = function handleMsg(msg) {
			console.log('@' + this.name, msg);
		};
	
		return PlayToggle;
	}(_Component3["default"]);
	
	exports["default"] = PlayToggle;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FullscreenToggle = function (_Component) {
		_inherits(FullscreenToggle, _Component);
	
		function FullscreenToggle(player) {
			_classCallCheck(this, FullscreenToggle);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'FullscreenToggle'));
		}
	
		FullscreenToggle.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-fullscreen-toggle' });
			window.fsApi = util.FullscreenApi;
			return _Component.prototype.render.call(this, owner);
		};
	
		FullscreenToggle.prototype.setup = function setup() {
			this.on('click', this.onClick);
		};
	
		FullscreenToggle.prototype.onClick = function onClick() {
			this.player.fullscreen(!this.player.fullscreen());
		};
	
		FullscreenToggle.prototype.handleMsg = function handleMsg(msg) {
			console.log(FullscreenToggle.name, msg);
		};
	
		return FullscreenToggle;
	}(_Component3["default"]);
	
	exports["default"] = FullscreenToggle;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.MSG = undefined;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MSG = exports.MSG = { Changing: 'sliderchanging', Changed: 'sliderchanged' };
	/**
	 * @method percent
	 * @class Slider
	 */
	
	var Slider = function (_Component) {
		_inherits(Slider, _Component);
	
		function Slider(player, vertical) {
			_classCallCheck(this, Slider);
	
			var _this = _possibleConstructorReturn(this, _Component.call(this, player, 'Slider'));
	
			_this.vertical = vertical || false;
			return _this;
		}
	
		Slider.prototype.render = function render(owner, enabled) {
			var sliderClass = this.vertical ? 'vcp-slider-vertical' : 'vcp-slider';
			this.createEl('div', { 'class': sliderClass });
			this.track = dom.createEl('div', { 'class': 'vcp-slider-track' });
			this.thumb = dom.createEl('div', { 'class': 'vcp-slider-thumb' });
			this.el.appendChild(this.track);
			this.el.appendChild(this.thumb);
			this.enabled = typeof enabled == 'undefined' ? true : enabled;
			return _Component.prototype.render.call(this, owner);
		};
	
		Slider.prototype.setup = function setup() {
			if (!this.enabled) return;
	
			this.ownerDoc = document.body.ownerDocument;
			this.on('mousedown', this.mousedown);
			this.on('touchstart', this.mousedown);
		};
	
		Slider.prototype.handleMsg = function handleMsg(msg) {};
	
		Slider.prototype.mousedown = function mousedown(e) {
			e.preventDefault && e.preventDefault(); // 没加上这一句，就会偶尔出现拖动不了的情况，并且指针变成文字输入光标
	
			this.pos = dom.findElPosition(this.el);
	
			this.on(this.ownerDoc, 'mouseup', this.mouseup);
			this.on(this.ownerDoc, 'mousemove', this.mousemove);
			this.on(this.ownerDoc, 'touchend', this.mouseup);
			this.on(this.ownerDoc, 'touchmove', this.mousemove);
	
			this.mousemove(e);
			return false;
		};
	
		Slider.prototype.mouseup = function mouseup(e) {
			var target = e.target || e.srcElement;
			// console.log(e.type, target.className, e.toElement.className, this);
			this.off(this.ownerDoc, 'mouseup', this.mouseup);
			this.off(this.ownerDoc, 'mousemove', this.mousemove);
			this.off(this.ownerDoc, 'touchend', this.mouseup);
			this.off(this.ownerDoc, 'touchmove', this.mousemove);
			this.pub({ type: MSG.Changed, src: this, "private": true });
		};
	
		Slider.prototype.mousemove = function mousemove(e) {
			var pos = dom.getPointerPosition(this.el, e, this.pos);
			if (this.vertical) {
				this.__percent = 1 - pos.y;
				this.thumb.style.top = this.__percent * 100 + '%';
			} else {
				this.__percent = pos.x;
				this.thumb.style.left = this.__percent * 100 + '%';
			}
			this.__percent = Number(this.__percent.toFixed(3));
			this.pub({ type: MSG.Changing, src: this, "private": true });
		};
	
		Slider.prototype.percent = function percent(p) {
			if (!p) return this.__percent;
	
			this.__percent = p;
			if (this.vertical) this.thumb.style.top = this.__percent * 100 + '%';else this.thumb.style.left = this.__percent * 100 + '%';
		};
	
		return Slider;
	}(_Component3["default"]);
	
	exports["default"] = Slider;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Slider = __webpack_require__(17);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @method percent
	 * @property {Slider} progress
	 * @property {Boolean} scrubbing
	 * @class Timeline
	 */
	
	var Timeline = function (_Component) {
		_inherits(Timeline, _Component);
	
		function Timeline(player) {
			_classCallCheck(this, Timeline);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'Timeline'));
		}
	
		Timeline.prototype.render = function render(owner) {
			this.enabled = !this.options.live;
	
			this.createEl('div', { 'class': 'vcp-timeline' });
			this.progress = new _Slider2["default"](this.player, false);
			this.progress.render(this.el, this.enabled);
			this.track = this.progress.track;
	
			return _Component.prototype.render.call(this, owner);
		};
	
		Timeline.prototype.setup = function setup() {
			if (!this.enabled) return;
	
			this.sub(_Slider.MSG.Changing, this.progress, util.bind(this, this.handleMsg));
			this.sub(_Slider.MSG.Changed, this.progress, util.bind(this, this.handleMsg));
		};
	
		Timeline.prototype.handleMsg = function handleMsg(msg) {
			if (msg.type === _Slider.MSG.Changing) {
				this.scrubbing = true;
				this.syncLabel(this.percent());
			} else if (msg.type === _Slider.MSG.Changed) {
				this.scrubbing = false;
			}
		};
	
		Timeline.prototype.syncLabel = function syncLabel(p) {
			// 保持与进度条一致
			var d = this.player.duration();
			p = Math.min(p, 1);
			var time = '';
			if (d) time = util.covertTime(p * d) + '/' + util.covertTime(d);
			this.pub({ type: 'timelabel', src: 'timeline', label: time, "private": true });
		};
	
		Timeline.prototype.buffered = function buffered(b) {
			if (!this.enabled) return;
	
			b = Math.min(b, 1);
			this.__buffered = b;
			this.track.style.width = b * 100 + '%';
		};
	
		Timeline.prototype.percent = function percent(p) {
			if (!this.enabled) return;
	
			if (typeof p === 'undefined') return this.progress.percent() || 0;
			p = Math.min(p, 1); // flash m3u8 返回的duration不大对，但是进度条要保证不溢出
			this.syncLabel(p);
			// 修正hls.js 和 IE9 下progress事件触发不彻底
			if (this.__buffered < p) this.buffered(this.player.buffered());
	
			return this.progress.percent(p);
		};
	
		return Timeline;
	}(_Component3["default"]);
	
	exports["default"] = Timeline;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Slider = __webpack_require__(17);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @method percent
	 * @property {Slider} progress
	 * @property {Boolean} scrubbing
	 * @class Timeline
	 */
	
	var Timelabel = function (_Component) {
		_inherits(Timelabel, _Component);
	
		function Timelabel(player) {
			_classCallCheck(this, Timelabel);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'Timelabel'));
		}
	
		Timelabel.prototype.render = function render(owner) {
			this.createEl('span', { 'class': 'vcp-timelabel' });
	
			return _Component.prototype.render.call(this, owner);
		};
	
		Timelabel.prototype.setup = function setup() {
			this.sub('timelabel', 'timeline', util.bind(this, this.handleMsg));
		};
	
		Timelabel.prototype.handleMsg = function handleMsg(msg) {
			this.el.innerHTML = msg.label;
		};
	
		return Timelabel;
	}(_Component3["default"]);
	
	exports["default"] = Timelabel;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Slider = __webpack_require__(17);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	var _message = __webpack_require__(10);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @method percent
	 * @property {Slider} volume
	 * @class Timeline
	 */
	
	var Volume = function (_Component) {
		_inherits(Volume, _Component);
	
		function Volume(player) {
			_classCallCheck(this, Volume);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'Volume'));
		}
	
		Volume.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-volume' });
			this.bg = dom.createEl('div', { 'class': 'vcp-volume-bg' });
			this.el.appendChild(this.bg);
	
			this.volume = new _Slider2["default"](this.player, true);
			this.volume.render(this.el);
			this.track = this.volume.track;
	
			this.icon = dom.createEl('span', { 'class': 'vcp-volume-icon' });
			this.el.appendChild(this.icon);
	
			return _Component.prototype.render.call(this, owner);
		};
	
		Volume.prototype.setup = function setup() {
			this.sub(_Slider.MSG.Changing, this.volume, util.bind(this, this.handleMsg));
			this.sub(_Slider.MSG.Changed, this.volume, util.bind(this, this.handleMsg));
			this.sub(_message.MSG.VolumeChange, this.player.video, util.bind(this, this.handleMsg));
			this.on(this.icon, 'click', this.toggleMute);
		};
	
		Volume.prototype.handleMsg = function handleMsg(msg) {
			switch (msg.type) {
				case _Slider.MSG.Changing:
					this.syncTrack(this.percent());
					break;
				case _Slider.MSG.Changed:
					this.percent(this.percent());
					break;
				case _message.MSG.VolumeChange:
					var p = this.player.volume();
					this.syncTrack(p);
					this.syncMute(this.player.mute());
					break;
			}
		};
	
		Volume.prototype.toggleMute = function toggleMute(e) {
			var muted = !this.player.mute();
			this.player.mute(muted);
		};
	
		Volume.prototype.syncMute = function syncMute(muted) {
			if (muted) dom.addClass(this.el, 'vcp-volume-muted');else dom.removeClass(this.el, 'vcp-volume-muted');
			this.__muted = muted;
		};
	
		Volume.prototype.syncTrack = function syncTrack(p) {
			this.track.style.height = p * 100 + '%';
			this.volume.percent(1 - p);
			if (p == 0) {
				this.syncMute(true);
			} else if (p > 0 && this.__muted) {
				this.syncMute(false);
			}
		};
	
		Volume.prototype.percent = function percent(p) {
			if (typeof p === 'undefined') return 1 - this.volume.percent() || 0;
	
			this.player.volume(p);
			return p;
		};
	
		return Volume;
	}(_Component3["default"]);
	
	exports["default"] = Volume;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: anderlu
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2016/12/6
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 11:03
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var wording = {
	    od: '原画',
	    hd: '高清',
	    sd: '标清'
	};
	
	var ClaritySwitcher = function (_Component) {
	    _inherits(ClaritySwitcher, _Component);
	
	    function ClaritySwitcher(player) {
	        _classCallCheck(this, ClaritySwitcher);
	
	        return _possibleConstructorReturn(this, _Component.call(this, player, 'ClaritySwitcher'));
	    }
	
	    ClaritySwitcher.prototype.render = function render(owner) {
	        this.show = false;
	        this.createEl('div', { 'class': 'vcp-clarityswitcher' });
	        this.current = dom.createEl('a', { 'class': 'vcp-vertical-switcher-current' });
	        this.container = dom.createEl('div', { 'class': 'vcp-vertical-switcher-container' });
	        this.items = [];
	        this.currentItem = '';
	        var vs = this.options.videoSource;
	        this.current.innerHTML = wording[vs.curDef];
	        this.el.appendChild(this.current);
	
	        for (var i = 0; i < vs.definitions.length; i++) {
	            var item = dom.createEl('a', { 'class': 'vcp-vertical-switcher-item' });
	            item.innerHTML = wording[vs.definitions[i]];
	            if (vs.definitions[i] == vs.curDef) {
	                item.classList.add('current');
	                this.currentItem = item;
	            }
	            item.setAttribute('data-def', vs.definitions[i]);
	            this.items.push(item);
	            this.container.appendChild(item);
	        }
	        this.el.appendChild(this.container);
	        return _Component.prototype.render.call(this, owner);
	    };
	
	    ClaritySwitcher.prototype.setup = function setup() {
	        this.on('click', this.onClick);
	        this.on('mouseenter', this.onMouseEnter);
	        this.on('mouseleave', this.onMouseLeave);
	
	        // this.sub('play', this.player.video, util.bind(this, this.handleMsg));
	        // this.sub('pause', this.player.video, util.bind(this, this.handleMsg));
	    };
	
	    ClaritySwitcher.prototype.onClick = function onClick(event) {
	        //console.log(this, event.target.getAttribute('data-def'));
	        var def = event.target.getAttribute('data-def');
	        if (def) {
	            this.current.innerHTML = wording[def];
	            this.currentItem.classList.remove('current');
	            event.target.classList.add('current');
	            this.currentItem = event.target;
	            this.player.switchClarity(def);
	        } else {
	            if (!this.show) {} else {}
	        }
	    };
	
	    ClaritySwitcher.prototype.onMouseLeave = function onMouseLeave() {
	        this.container.style.display = 'none';
	        this.show = false;
	    };
	
	    ClaritySwitcher.prototype.onMouseEnter = function onMouseEnter() {
	        this.container.style.display = 'block';
	        this.show = true;
	    };
	
	    return ClaritySwitcher;
	}(_Component3["default"]);
	
	exports["default"] = ClaritySwitcher;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _browser = __webpack_require__(7);
	
	var B = _interopRequireWildcard(_browser);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BigPlay = function (_Component) {
		_inherits(BigPlay, _Component);
	
		function BigPlay(player) {
			_classCallCheck(this, BigPlay);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'BigPlay'));
		}
	
		BigPlay.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-bigplay' });
	
			return _Component.prototype.render.call(this, owner);
		};
	
		BigPlay.prototype.setup = function setup() {
			this.on('click', this.onClick);
		};
	
		BigPlay.prototype.onClick = function onClick() {
			var video = this.player.video;
			if (B.IS_MOBILE && !video.paused()) {
				return this.player.panel && this.player.panel.toggle();
			}
	
			if (video.paused()) video.play();else video.pause();
		};
	
		BigPlay.prototype.handleMsg = function handleMsg(msg) {
			console.log('@' + this.name, msg);
		};
	
		return BigPlay;
	}(_Component3["default"]);
	
	exports["default"] = BigPlay;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	var _message = __webpack_require__(10);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Poster = function (_Component) {
		_inherits(Poster, _Component);
	
		function Poster(player) {
			_classCallCheck(this, Poster);
	
			var _this = _possibleConstructorReturn(this, _Component.call(this, player, 'Poster'));
	
			if (_this.options.poster && _typeof(_this.options.poster) == 'object') {
				_this.poster = _this.options.poster;
			} else if (typeof _this.options.poster == 'string') {
				_this.poster = { src: _this.options.poster };
			} else {
				_this.poster = {};
			}
			return _this;
		}
	
		Poster.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-poster' });
			this.hide();
	
			var poster = this.poster;
			if (poster) {
				this.pic = dom.createEl('img', { 'class': 'vcp-poster-pic' });
				var stretch = this.poster.style == 'stretch';
				if (stretch) {
					this.pic.style.cssText = 'width: 100%; height: 100%;';
				} else {
					this.pic.style.cssText = '';
				}
				this.el.appendChild(this.pic);
	
				// this.setPoster(this.poster.start);
			}
	
			return _Component.prototype.render.call(this, owner);
		};
	
		Poster.prototype.setup = function setup() {
			this.on('click', this.onClick);
			this.sub(_message.MSG.Load, this.player.video, util.bind(this, this.handleMsg));
			this.sub(_message.MSG.MetaLoaded, this.player.video, util.bind(this, this.handleMsg));
			this.sub(_message.MSG.Play, this.player.video, util.bind(this, this.handleMsg));
			this.sub(_message.MSG.Pause, this.player.video, util.bind(this, this.handleMsg));
			this.sub(_message.MSG.Ended, this.player.video, util.bind(this, this.handleMsg));
		};
	
		Poster.prototype.onClick = function onClick() {
			this.pub({ type: 'click', src: this });
		};
	
		Poster.prototype.handleMsg = function handleMsg(msg) {
			// console.log('@' + this.name, msg);
			switch (msg.type) {
				case _message.MSG.Load:
					this.__loaded = false;
					break;
				case _message.MSG.MetaLoaded:
					this.__loaded = true;
					if (this.player.playing()) this.hide();else this.setPoster(this.poster.start);
					break;
				case _message.MSG.Play:
					if (!this.__loaded) break;
					this.hide();
					break;
				case _message.MSG.Pause:
					if (!this.__loaded) break;
					this.setPoster(this.poster.pause);
					break;
				case _message.MSG.Ended:
					if (!this.__loaded) break;
					this.setPoster(this.poster.end);
					break;
			}
		};
	
		Poster.prototype.setPoster = function setPoster(src) {
			src = src || this.poster.src;
			if (!src) return;
	
			if (this.__preload) this.__preload.onload = null; // 图片加载是异步的，所以要清除迟到的onload
			this.__preload = new Image();
	
			var img = this.__preload;
	
			this.hide();
			var self = this;
			img.onload = function () {
				self.pic.src = img.src;
				self.show();
	
				var stretch = self.poster.style == 'stretch';
				if (stretch) return;
	
				var left = '-' + img.width / 2 + 'px',
				    top = '-' + img.height / 2 + 'px';
	
				self.pic.style.cssText = 'left: 50%; top: 50%; margin-left: ' + left + '; margin-top: ' + top + ';';
			};
	
			img.src = src;
		};
	
		Poster.prototype.toggle = function toggle(display) {
			clearTimeout(this.__tid); // 防止跳变
			var self = this;
			this.__tid = setTimeout(function () {
				self.el.style.display = display;
			}, 100);
		};
	
		Poster.prototype.hide = function hide() {
			this.__preload && (this.__preload.onload = null);
			this.toggle('none');
		};
	
		Poster.prototype.show = function show() {
			this.toggle('block');
		};
	
		return Poster;
	}(_Component3["default"]);
	
	exports["default"] = Poster;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LLL = {};
	// http://spin.js.org/#v2.3.2
	!function (a, b) {
		a.Spinner = b();
	}(LLL, function () {
		"use strict";
		function a(a, b) {
			var c,
			    d = document.createElement(a || "div");for (c in b) {
				d[c] = b[c];
			}return d;
		}function b(a) {
			for (var b = 1, c = arguments.length; c > b; b++) {
				a.appendChild(arguments[b]);
			}return a;
		}function c(a, b, c, d) {
			var e = ["opacity", b, ~ ~(100 * a), c, d].join("-"),
			    f = .01 + c / d * 100,
			    g = Math.max(1 - (1 - a) / b * (100 - f), a),
			    h = j.substring(0, j.indexOf("Animation")).toLowerCase(),
			    i = h && "-" + h + "-" || "";return m[e] || (k.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", k.cssRules.length), m[e] = 1), e;
		}function d(a, b) {
			var c,
			    d,
			    e = a.style;if (b = b.charAt(0).toUpperCase() + b.slice(1), void 0 !== e[b]) return b;for (d = 0; d < l.length; d++) {
				if (c = l[d] + b, void 0 !== e[c]) return c;
			}
		}function e(a, b) {
			for (var c in b) {
				a.style[d(a, c) || c] = b[c];
			}return a;
		}function f(a) {
			for (var b = 1; b < arguments.length; b++) {
				var c = arguments[b];for (var d in c) {
					void 0 === a[d] && (a[d] = c[d]);
				}
			}return a;
		}function g(a, b) {
			return "string" == typeof a ? a : a[b % a.length];
		}function h(a) {
			this.opts = f(a || {}, h.defaults, n);
		}function i() {
			function c(b, c) {
				return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c);
			}k.addRule(".spin-vml", "behavior:url(#default#VML)"), h.prototype.lines = function (a, d) {
				function f() {
					return e(c("group", { coordsize: k + " " + k, coordorigin: -j + " " + -j }), { width: k, height: k });
				}function h(a, h, i) {
					b(m, b(e(f(), { rotation: 360 / d.lines * a + "deg", left: ~ ~h }), b(e(c("roundrect", { arcsize: d.corners }), { width: j, height: d.scale * d.width, left: d.scale * d.radius, top: -d.scale * d.width >> 1, filter: i }), c("fill", { color: g(d.color, a), opacity: d.opacity }), c("stroke", { opacity: 0 }))));
				}var i,
				    j = d.scale * (d.length + d.width),
				    k = 2 * d.scale * j,
				    l = -(d.width + d.length) * d.scale * 2 + "px",
				    m = e(f(), { position: "absolute", top: l, left: l });if (d.shadow) for (i = 1; i <= d.lines; i++) {
					h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
				}for (i = 1; i <= d.lines; i++) {
					h(i);
				}return b(a, m);
			}, h.prototype.opacity = function (a, b, c, d) {
				var e = a.firstChild;d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c));
			};
		}var j,
		    k,
		    l = ["webkit", "Moz", "ms", "O"],
		    m = {},
		    n = { lines: 12, length: 7, width: 5, radius: 10, scale: 1, corners: 1, color: "#000", opacity: .25, rotate: 0, direction: 1, speed: 1, trail: 100, fps: 20, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", shadow: !1, hwaccel: !1, position: "absolute" };if (h.defaults = {}, f(h.prototype, { spin: function spin(b) {
				this.stop();var c = this,
				    d = c.opts,
				    f = c.el = a(null, { className: d.className });if (e(f, { position: d.position, width: 0, zIndex: d.zIndex, left: d.left, top: d.top }), b && b.insertBefore(f, b.firstChild || null), f.setAttribute("role", "progressbar"), c.lines(f, c.opts), !j) {
					var g,
					    h = 0,
					    i = (d.lines - 1) * (1 - d.direction) / 2,
					    k = d.fps,
					    l = k / d.speed,
					    m = (1 - d.opacity) / (l * d.trail / 100),
					    n = l / d.lines;!function o() {
						h++;for (var a = 0; a < d.lines; a++) {
							g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity), c.opacity(f, a * d.direction + i, g, d);
						}c.timeout = c.el && setTimeout(o, ~ ~(1e3 / k));
					}();
				}return c;
			}, stop: function stop() {
				var a = this.el;return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = void 0), this;
			}, lines: function lines(d, f) {
				function h(b, c) {
					return e(a(), { position: "absolute", width: f.scale * (f.length + f.width) + "px", height: f.scale * f.width + "px", background: b, boxShadow: c, transformOrigin: "left", transform: "rotate(" + ~ ~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.scale * f.radius + "px,0)", borderRadius: (f.corners * f.scale * f.width >> 1) + "px" });
				}for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++) {
					i = e(a(), { position: "absolute", top: 1 + ~(f.scale * f.width / 2) + "px", transform: f.hwaccel ? "translate3d(0,0,0)" : "", opacity: f.opacity, animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite" }), f.shadow && b(i, e(h("#000", "0 0 4px #000"), { top: "2px" })), b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)")));
				}return d;
			}, opacity: function opacity(a, b, c) {
				b < a.childNodes.length && (a.childNodes[b].style.opacity = c);
			} }), "undefined" != typeof document) {
			k = function () {
				var c = a("style", { type: "text/css" });return b(document.getElementsByTagName("head")[0], c), c.sheet || c.styleSheet;
			}();var o = e(a("group"), { behavior: "url(#default#VML)" });!d(o, "transform") && o.adj ? i() : j = d(o, "animation");
		}return h;
	});
	
	var Loading = function (_Component) {
		_inherits(Loading, _Component);
	
		function Loading(player) {
			_classCallCheck(this, Loading);
	
			return _possibleConstructorReturn(this, _Component.call(this, player, 'Loading'));
		}
	
		Loading.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-loading' });
			// this.el.appendChild(dom.createEl('img', {'src': './src/img/loading.svg'}));
			// 大小计算：min: (length + width + radius) * 2
			var opts = {
				lines: 11 // The number of lines to draw
				, length: 12 // The length of each line
				, width: 4 // The line thickness
				, radius: 16 // The radius of the inner circle
				, scale: 1 // Scales overall size of the spinner
				, corners: 1 // Corner roundness (0..1)
				, color: '#fff' // #rgb or #rrggbb or array of colors
				, opacity: 0.25 // Opacity of the lines
				, rotate: 0 // The rotation offset
				, direction: 1 // 1: clockwise, -1: counterclockwise
				, speed: 1 // Rounds per second
				, trail: 60 // Afterglow percentage
				, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
				, zIndex: 2e9 // The z-index (defaults to 2000000000)
				, className: 'vcp-spinner' // The CSS class to assign to the spinner
				, top: '50%' // Top position relative to parent
				, left: '50%' // Left position relative to parent
				, shadow: false // Whether to render a shadow
				, hwaccel: true // Whether to use hardware acceleration
				, position: 'absolute' // Element positioning
			};
			var spinner = new LLL.Spinner(opts).spin(this.el);
			return _Component.prototype.render.call(this, owner);
		};
	
		Loading.prototype.setup = function setup() {};
	
		Loading.prototype.handleMsg = function handleMsg(msg) {};
	
		Loading.prototype.show = function show() {
			this.el.style.display = "block";
		};
	
		Loading.prototype.hide = function hide() {
			this.el.style.display = "none";
		};
	
		return Loading;
	}(_Component3["default"]);
	
	exports["default"] = Loading;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Component2 = __webpack_require__(12);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	var _dom = __webpack_require__(8);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _message = __webpack_require__(10);
	
	var message = _interopRequireWildcard(_message);
	
	var _util = __webpack_require__(9);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ErrorCat = { 'VideoSourceError': [1002, 4, 2032], 'NetworkError': [1001, 2048, 1, 3], 'VideoDecodeError': [2], 'ArgumentError': [] };
	var ErrorMap = {
		VideoSourceError: '视频源错误，请检查播放链接是否有效',
		NetworkError: '网络错误，请检查网络配置或者播放链接是否正确',
		VideoDecodeError: '视频解码错误',
		ArgumentError: '使用参数有误，请检查播放器调用代码',
		UrlEmpty: '请填写视频播放地址',
		FileProtocol: '请勿在file协议下使用播放器，可能会导致视频无法播放'
	};
	
	var ErrorTips = function (_Component) {
		_inherits(ErrorTips, _Component);
	
		function ErrorTips(player) {
			_classCallCheck(this, ErrorTips);
	
			var _this = _possibleConstructorReturn(this, _Component.call(this, player, 'ErrorTips'));
	
			_this.customTips = util.extend({}, ErrorMap, _this.options.wording);
			for (var e in ErrorCat) {
				for (var i = 0; i < ErrorCat[e].length; i++) {
					var code = ErrorCat[e][i];
					_this.customTips[code] = _this.customTips[code] || _this.customTips[e];
				}
			}
			return _this;
		}
	
		ErrorTips.prototype.render = function render(owner) {
			this.createEl('div', { 'class': 'vcp-error-tips' });
	
			return _Component.prototype.render.call(this, owner);
		};
	
		ErrorTips.prototype.setup = function setup() {};
	
		ErrorTips.prototype.handleMsg = function handleMsg(msg) {};
	
		/**
	  *
	  * @param {Number|String|Object} detail
	  * @param {Number} detail.code 错误代码
	  * @param {String} detail.reason 错误原因
	  */
	
	
		ErrorTips.prototype.show = function show(detail) {
			this.el.style.display = "block";
			var errstr = void 0;
			if (typeof detail === 'string') {
				errstr = detail;
			} else {
				var reason = this.customTips[detail.code] || detail.reason;
				errstr = '[' + detail.code + ']' + reason;
			}
	
			this.el.innerHTML = errstr;
		};
	
		ErrorTips.prototype.hide = function hide() {
			this.el.style.display = "none";
		};
	
		return ErrorTips;
	}(_Component3["default"]);
	
	exports["default"] = ErrorTips;

/***/ }
/******/ ]);
//# sourceMappingURL=demo.js.map