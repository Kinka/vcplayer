import Component from './Component'
import Player, {MSG as PlayerMSG} from './Player'
import * as dom from './dom'
import * as util from './util'

/**
 *
 * @class FlashVideo
 */
export default class FlashVideo extends Component {
	constructor(player) {
		super(player, 'FlashVideo');

		var self = this;
		window.flashlsCallback = function(eventName, args) {
			self.notify(eventName, args && args[0]);
		};
	}
	
	render(owner) {
		var swfurl = 'http://imgcache.qq.com/open/qcloud/video/player/release/QCPlayer.swf';
		swfurl = 'http://test.qzs.qq.com/iot/demo/player/QCplayer.swf';
		var options = this.player.options;
		var wmode = 'opaque';
		var id = 'obj_vcplayer_' + this.player.guid;
		this.__id = id;
		owner.innerHTML = `
		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="${id}" width="${options.width}" height="${options.height}">
            <param name="movie"  value="${swfurl}" />
            <param name="quality" value="autohigh" />
            <param name="swliveconnect" value="true" />
            <param name="allowScriptAccess" value="always" />
            <param name="bgcolor" value="#000" />
            <param name="allowFullScreen" value="true" />
            <param name="wmode" value="${wmode}" />
            <param name="FlashVars" value="url=" />

            <embed src="${swfurl}" width="${options.width}" height="${options.height}" name="${id}"
                   quality="autohigh"
                   bgcolor="#000"
                   align="middle" allowFullScreen="true"
                   allowScriptAccess="always"
                   type="application/x-shockwave-flash"
                   swliveconnect="true"
                   wmode="${wmode}"
                   FlashVars="url="
                   pluginspage="http://www.macromedia.com/go/getflashplayer" >
            </embed>
        </object>
		`;
		this.owner = owner;
	}
	setup() {
		this.on('error', this.notify);
	}

	/**
	 *
	 * @param eventName
	 * @param info
	 * @property info.bytesLoaded
	 * @property info.bytesTotal
	 */
	notify(eventName, info) {
		try {
			var e = {type: eventName, timeStamp: +new Date()};
			if (eventName == 'printLog') {
				if (info.message.indexOf('onMetaData') > -1) {
					e.type = 'MetaData';
				} else if (info.message.indexOf('Play.Start') > -1 || info.message.indexOf('Unpause') > -1) {
					this.__playing = true;
					this.__stopped = false;
					e.type = PlayerMSG.Play;
				} else if (info.message.indexOf('Seek.Complete') > -1) {
					this.play();
				} else if (info.message.indexOf('Pause') > -1) {
					this.__playing = false;
					this.__stopped = false;
					e.type = PlayerMSG.Pause;
				} else if (info.message.indexOf('Stop') > -1) {
					this.__playing = false;
					this.__stopped = true;
					e.type = PlayerMSG.Ended;
				} else if (info.message.indexOf('SeekStart.Notify') > -1) {
					e.type = PlayerMSG.Seeking;
				} else if (info.message.indexOf('Seek.Notify') > -1) {
					e.type = PlayerMSG.Seeked;
				}
			}

			if (eventName != 'mediaTime' && eventName != 'printLog' && eventName != 'canPlay')
				console.log(eventName, info);

			switch (e.type) {
				case 'ready':
					this.el = getFlashMovieObject(this.__id);
					this.setup();
					this.el.setAutoPlay(this.options.autoplay);
					this.el.playerLoad(this.options.src);
					return;
					break;
				case 'canPlay':
					e.type = PlayerMSG.Loaded;
					break;
				case 'MetaData':

					break;
				case 'mediaTime':
					e.type = PlayerMSG.TimeUpdate;
					this.__bytesTotal = info.bytesTotal;
					this.__videoWidth = info.videoWidth;
					this.__videoHeight = info.videoHeight;
					if (this.__bytesloaded != info.bytesLoaded) {
						this.__bytesloaded = info.bytesLoaded;
						this.pub({type: PlayerMSG.Progress, src: this, ts: e.timeStamp});
					}

					break;
			}

			this.pub({type: e.type, src: this, ts: e.timeStamp});
		} catch (e) {
			console.log(eventName, e);
		}
	}
	handleMsg(msg) {

	}
	videoWidth() {
		return this.__videoWidth;
	}
	videoHeight() {
		return this.__videoHeight;
	}
	width(w) {
		if (typeof w === 'undefined') return this.el && this.el.width;
		w = '100%';
		return this.el && (this.el.width = w);
	}
	height(h) {
		if (typeof h === 'undefined') return this.el && this.el.height;
		h = '100%';
		return this.el && (this.el.height = h);
	}
	play() {
		if (this.__stopped) this.currentTime(0);
		this.el.playerPlay();
	}
	pause() {
		this.el.playerPause();
	}
	stop() {

	}
	paused() {
		return !this.__playing;
	}
	buffered() {
		var p = (this.__bytesloaded || 0) / (this.__bytesTotal || 1);
		return this.duration() * p;
	}
	currentTime(time) {
		if (typeof time === 'undefined') return this.el.getPosition();
		this.el.playerSeek(time);

	}
	duration() {
		return this.el && this.el.getDuration();
	}
	mute(muted) {
		if (typeof muted === 'undefined') return false;
		this.volume(muted ? 0 : 0.5);
	}
	volume(p) {
		if (typeof p === 'undefined') return 0.5;
		this.el && this.el.playerVolume(p);
	}

	fullscreen(enter) {
		return util.doFullscreen(this.player, enter, this.owner);
	}
}

/**
 *
 * @param movieName
 * @returns {Object} el
 * @property {Function} el.getDuration
 * @property {Function} el.getPosition
 * @property {Function} el.playerPlay
 * @property {Function} el.playerPause
 * @property {Function} el.setAutoPlay
 * @property {Function} el.playerLoad
 * @property {Function} el.getbufferLength
 * @property {Function} el.playerSeek
 * @property {Function} el.playerVolume
 */
function getFlashMovieObject(movieName) {
	if (window.document[movieName])	{
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet")==-1) {
		if (document.embeds && document.embeds[movieName])
			return document.embeds[movieName];
	} else {
		return document.getElementById(movieName);
	}
}