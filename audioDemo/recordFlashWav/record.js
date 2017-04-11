//知识点选择组件
var $ = require("common:components/jquery/jquery.js");
var Backbone = require("common:components/backbone/backbone.js");
var Confirm = require("/widget/plugins/confirm/confirm.js");
var swfobject = require("/widget/plugins/recordFlashWav/core/swfobject.js");
var FlashRecorder = require("/widget/plugins/recordFlashWav/core/recorder.js");
var Info = require("task:widget/plugins/info/info.js");
var RecordAudioWin = Confirm.extend({
  template: __inline('./_record.tmpl'),
  initialize: function(args) {
    this.args = args;
    Confirm.prototype.initialize.apply(this, arguments);
    this.open();
    this.$el.off();
    this.init(args);
    this.centre();
  },
  events: $.extend(Confirm.prototype.events, {
    'click .audio-msg': 'funAudio',
    'click .playback': 'playbackHandler',
    'click .btncancel': 'btncancelHandler'
  }),
  init: function(options) {
    this.initWav();
  },
  initWav: function() {
    //初始化flash播放器
    var _self = this;
    var uid = _self.args.options.uid;
    _self.$curWin = this.$el;
    _self.duration = 0; //语音时长
    _self.ctrlFlag = 0; //控制图片功能切换。
    _self.timmer; //定时器
    _self.$audioIcon = this.$el.find('.audio-icon');
    _self.$aduioMsg = this.$el.find('.audio-msg');
    _self.$btnUpload = this.$el.find('.btnUpload');
    _self.$btnPlayback = this.$el.find('.playback');
    _self.$recordingslist = this.$el.find('.recordingslist');
    var RECORDER_APP_ID = "recorderApp_" + uid;
    var appWidth = 230;
    var appHeight = 40;
    var baseurl = window.location.protocol + '//' + window.location.hostname;
    var flashvars = {
      'upload_image': baseurl + '/static/js/public/audiocore/FlashWavRecorder/html/images/fupload.png'
    };
    var params = {};
    var attributes = {
      'id': RECORDER_APP_ID,
      'name': RECORDER_APP_ID
    };
    var swfurl = baseurl + '/static/js/public/audiocore/FlashWavRecorder/html/recorder.swf';
    swfobject.embedSWF(swfurl, "flashcontent_" + uid, appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);
    window.fwr_event_handler = function fwr_event_handler() {
      //录音模块事件控制中心
      var name,
        $controls;
      switch (arguments[0]) {
        case "ready": //准备，插件加载成功了，可以使用了
          //console.log('ready...', arguments);
          FWRecorder.uploadFormId = "#uploadForm_" + uid;
          FWRecorder.uploadFieldName = "upload_file[filename]";
          FWRecorder.connect(RECORDER_APP_ID, 0);
          //FWRecorder.record('audio', 'audio.wav');
          FWRecorder.recorderOriginalWidth = appWidth;
          FWRecorder.recorderOriginalHeight = appHeight;
          _self.$recordingslist.hide();
          FWRecorder.showPermissionWindow();
          //FWRecorder.showPermissionWindow();
          //if (!FWRecorder.isReady) {
          //FWRecorder.showPermissionWindow({permanent: true});
          //}
          break;
        case "no_microphone_found":
          //未找到麦克风
          _self.msg('未找到麦克风');
          break;
        case "microphone_user_request":
          //请求麦克风，显示权限窗口
          //console.log('microphone_user_request...');
          break;
        case "permission_panel_closed":
          //请求麦克风，显示权限窗口，关闭
          //console.log('permission_panel_closed...');
          FWRecorder.defaultSize();
          FWRecorder.configure(44, 0, 10, 5000); //gain是音量增益
          _self.FcontainerCls('flashhide');
          //FWRecorder.record('audio', 'audio.wav');
          break;
        case "microphone_connected":
          //麦克风连接成功了，可以使用了。
          //console.log('microphone_connected...');
          //FWRecorder.stopRecording('audio');
          FWRecorder.isReady = true;
          _self.ctrlFlag = 1; //麦克风可以使用
          //FWRecorder.defaultSize();
          _self.FcontainerCls('flashhide');
          //$('.flashPlayer-container').addClass('flashhide');
          break;
        case "recording": //开始录音
          //  console.log('recording...');
          FWRecorder.hide();
          FWRecorder.observeLevel();
          _self.FcontainerCls('flashhide');
          //$('.flashPlayer-container').addClass('flashhide');
          break;
        case "observing_level": //录音级别
          //console.log('observing_level...');
          break;
        case "microphone_activity": //录音进行中
          //console.log('microphone_activity...');
          _self.funStartHandler();
          break;
        case "microphone_level": //麦克风级别-不断调用
          //console.log('microphone_level...');
          break;
        case "recording_stopped": //录音完成
          //console.log('recording_stopped...');
          FWRecorder.stopObservingLevel();
          var duration = arguments[2];
          if (duration == 0) {
            _self.msg('录音失败，请重试');
            _self.funStartEvt();
            return;
          }
          _self.duration = duration.toFixed(2); //录音时长
          //console.log(duration, _self.duration);
          FWRecorder.show();
          _self.saveRecorderForm();
          _self.funStopEvt();
          break;
        case "observing_level_stopped": //录音级别停止
          //console.log('observing_level_stopped...');
          break;
        case "playing": //点击试听
          //console.log('playing...');
          break;
        case "playback_started": //试听已开始
          //console.log('playback_started...');
          break;
        case "stopped": //试听完成
          //console.log('stopped...');
          _self.funPlayEnd();
          break;
        case "playing_paused":
          //console.log('playing_paused...');
          break;
        case "save_pressed":
          //console.log('save_pressed...');
          FWRecorder.updateForm();
          break;
        case "saving":
          //console.log('saving...');
          _self.msg('上传语音中...');
          name = arguments[1];
          //console.info('saving started', name);
          break;
        case "save_progress":
          //console.log('save_progress...');
          name = arguments[1];
          var bytesLoaded = arguments[2];
          var bytesTotal = arguments[3];
          //console.info('saving progress', name, bytesLoaded, '/', bytesTotal);
          break;
        case "saved":
          //console.log('saved...');
          //_self.msg('上传语音成功');
          name = arguments[1];
          var response = arguments[2];
          //console.info('saving success', name, response);
          _self.btncancelHandler();
          _self.args.completeBack(response); //上传后处理
          break;
        case "save_failed":
          //console.log('save_failed...');
          _self.msg('上传失败,请重试');
          name = arguments[1];
          var errorMessage = arguments[2];
          console.info('saving failed', name, errorMessage);
          break;
      }
    };
  },
  saveRecorderForm: function() {
    var _self = this;
    var duration = _self.duration;
    var requeststr = {
      length: Math.ceil(duration)
    };
    requeststr = $.extend(requeststr, _self.args.options);
    var $form = $(FWRecorder.uploadFormId);
    var $input = $form.find('[name="requeststr"]');
    $input.val(JSON.stringify(requeststr));
    _self.FcontainerCls('flashhide', true);
    _self.FcontainerCls('initcls', true);
    _self.FcontainerCls('saveFin');
  },
  FcontainerCls: function(className, vflag) {
    var flag = vflag || false;
    var $container = $('.flashPlayer-container');
    if (!flag) {
      $container.addClass(className);
    } else {
      $container.removeClass(className);
    }
  },
  funAudio: function(evt) {
    //图片点击控制
    //console.log('funAudio...');
    var _self = this;
    var $target = $(evt.currentTarget);
    var flag = this.$audioIcon.data('flag');
    if (_self.ctrlFlag !== 1) {
      return;
    }
    if (flag == '1') {
      _self.funStart();
    } else if (flag == '2') {
      clearTimeout(this.timmer);
      _self.funStop();
    }
  },
  funStart: function() {
    //console.log('funStart...', !!!this.recorder.start);
    var _self = this;
    _self.log('录音开始...');
    FWRecorder.record('audio', 'audio.wav');
  },
  funStartHandler: function() {
    //开始录音后回调
    var _self = this;
    _self.$btnUpload.data('disable', 0);
    _self.$audioIcon.data('flag', '2');
    _self.$recordingslist.hide();
    _self.$audioIcon.removeClass('stop');
    _self.$btnUpload.removeClass('uploadcur');
    _self.$audioIcon.addClass('audioing');
    _self.$aduioMsg.text('完成录音');
    clearTimeout(this.timmer);
    _self.timmer = setTimeout(function() {
      //超过3分钟停止录音
      //console.log('_self.timmer...');
      var flag2 = _self.$audioIcon.data('flag');
      if (flag2 == 2) {
        _self.funStop();
      }
    }, 3 * 60 * 1000);
  },
  funStartEvt: function() {
    //录音失败后回调。
    var _self = this;
    _self.$btnUpload.data('disable', 0);
    _self.$audioIcon.data('flag', '1');
    _self.$audioIcon.addClass('stop');
    _self.$aduioMsg.text('重新录音');
    _self.$recordingslist.hide();
    _self.$btnUpload.removeClass('uploadcur');
  },
  funStop: function($target) {
    //console.log('funStop...', !!!this.recorder.stop);
    var _self = this;
    _self.log('录音结束...');
    FWRecorder.stopRecording('audio');
  },
  funStopEvt: function() {
    var _self = this;
    _self.$btnUpload.data('disable', 1);
    _self.$audioIcon.data('flag', '1');
    _self.$audioIcon.addClass('stop');
    _self.$aduioMsg.text('重新录音');
    _self.$recordingslist.show();
    _self.$btnUpload.addClass('uploadcur');
    _self.playbackStatsHtml();
  },
  funPlayBack: function() { //试听
    var _self = this;
    _self.log('录音试听...');
    var flag = FWRecorder.playBack('audio');
    if (!!flag) {
      _self.playbackStatsHtml(true);
      _self.$btnPlayback.data('playflag', '2');
    } else {
      _self.funPlayEnd();
    }
  },
  funPlayEnd: function() {
    var _self = this;
    _self.log('录音试听结束...');
    FWRecorder.stopPlayBack();
    _self.playbackStatsHtml();
    _self.$btnPlayback.data('playflag', '1');
  },
  playbackStatsHtml: function(vflag) {
    var flag = vflag || false;
    var _self = this;
    var $preloader = _self.$recordingslist.find('.preloader_1 span');
    if (!flag) {
      _self.$btnPlayback.html('点击试听');
      $preloader.removeClass('pk_play');
      $preloader.addClass('pk_end');
    } else {
      _self.$btnPlayback.html('停止播放');
      $preloader.removeClass('pk_end');
      $preloader.addClass('pk_play');
    }
  },
  playbackHandler: function() {
    //试听模块控制 playflag ，1-试听，2-停止
    var _self = this;
    var playflag = _self.$btnPlayback.data('playflag');
    if (playflag == '1') {
      _self.funPlayBack();
    } else if (playflag == '2') {
      _self.funPlayEnd();
    }
  },
  btncancelHandler: function() {
    //取消
    this.funStop();
    this.funPlayEnd();
    this.$curWin.hide();
    this.$el.empty();
  },
  msg: function(desc) {
    this.info = new Info({skinClass: 'skin_alert', msg: desc, width: 'auto'});
    this.info.openCenterClose();
  },
  log: function(str) {
    this.$recordingslist.innerHTML += str + '<br/>';
  }
});
return RecordAudioWin;
