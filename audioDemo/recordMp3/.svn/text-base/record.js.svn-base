//知识点选择组件
var $ = require("common:components/jquery/jquery.js");
var Backbone = require("common:components/backbone/backbone.js");
var Confirm = require("/widget/plugins/confirm/confirm.js");
var MP3Recorder = require("core/recordmp3.js");
var RecordAudioWin = Confirm.extend({
  template: __inline('./_record.tmpl'),
  initialize: function(args) {
    Confirm.prototype.initialize.apply(this, arguments);
    this.open();
    this.args = args;
    this.$el.off();
    this.init(args);
    this.centre();
  },
  events: $.extend(Confirm.prototype.events, {
    'click .audio-msg': 'funAudio',
    'click .btnStop': 'funStop',
    'click .btnUpload': 'funUpload',
    'click .btncancel': 'btncancelHandler'
  }),
  init: function(options) {
    //var recordTmpl = RecordTmpl({});
    //this.$el.html(recordTmpl);
    this.initMp3();
  },
  initMp3: function() {
    var _self = this;
    this.$curWin = this.$el;
    this.$audioIcon = this.$el.find('.audio-icon');
    this.$audioMsg = this.$el.find('.audio-msg');
    this.$aduioMsg = this.$el.find('.audio-msg');
    this.$btnUpload = this.$el.find('.btnUpload');
    this.$recordingslistFile = this.$el.find('.audio-file');
    this.$recordingslistInfo = this.$el.find('.record-info');
    this.recorder = new MP3Recorder({
      debug: false,
      funOk: function() {
        //_self.$btnStart.disabled = false;
        _self.$recordingslistInfo.html('初始化成功,可以录音');
      },
      funCancel: function(msg) {
        _self.log(msg);
        _self.$recordingslistInfo.html(msg);
        _self.recorder = null;
      }
    });
  },
  funAudio: function(evt) {
    //console.log('funAudio...');
    var _self = this;
    var $target = $(evt.currentTarget);
    var flag = _self.$audioIcon.data('flag');
    var timmer;
    if (flag == '1') {
      _self.funStart();
      _self.$recordingslistInfo.html('');
      timmer = setTimeout(function() {
        var flag2 = _self.$audioIcon.data('flag');
        if (flag2 == 2) {
          _self.funStop();
        }
      }, 3 * 60 * 1000);
    } else if (flag == '2') {
      clearTimeout(timmer);
      _self.funStop();
    }
  },
  funStart: function(evt) {
    //console.log('funStart...', !!!this.recorder.start);
    if (!!!this.recorder.start) {
      return;
    }
    var _self = this;
    _self.log('录音开始...');
    _self.recorder.start();
    _self.$btnUpload.data('disable', 0);
    _self.$btnUpload.removeClass('uploadcur');
    _self.$audioIcon.data('flag', '2');
    _self.$aduioMsg.text('完成录音');
    _self.$audioIcon.removeClass('stop');
    _self.$audioIcon.addClass('audioing');
    _self.$recordingslistFile.empty();
  },
  funStop: function(evt) {
    //console.log('funStop...', !!!this.recorder.stop);
    if (!!!this.recorder.stop) {
      return;
    }
    var _self = this;
    _self.log('录音结束，MP3导出中...');
    _self.recorder.stop();
    _self.$btnUpload.data('disable', 1);
    _self.$audioIcon.data('flag', '1');
    _self.$audioIcon.addClass('stop');
    _self.$aduioMsg.text('重新录音');
    //_self.$recordingslistFile.empty();
    _self.$btnUpload.addClass('uploadcur');
    _self.recorder.getMp3Blob(function(blob) {
      _self.log('MP3导出成功');
      _self.mp3Blob = blob;
      //console.log(_self.mp3Blob);
      var url = URL.createObjectURL(_self.mp3Blob);
      var div = document.createElement('div');
      var au = document.createElement('audio');
      //var hf = document.createElement('a');
      au.controls = true;
      au.src = url;
      //hf.href = url;
      //hf.download = new Date().toISOString() + '.mp3';
      //hf.innerHTML = hf.download;
      div.appendChild(au);
      //div.appendChild(hf);
      _self.$recordingslistFile.html(div);
    });
  },
  btncancelHandler: function() {
    if (!!this.recorder.stop) {
      this.recorder.stop();
    }
    this.$curWin.hide();
    this.$el.empty();
  },
  funUpload: function() {
    var _self = this;
    var url = '/pc/q/addAudioComment.do';
    var disable = _self.$btnUpload.data('disable');
    //console.log('funUpload...', disable);
    if (disable == 0) {
      return;
    }
    _self.$btnUpload.data('disable', '0');
    var fd = new FormData();
    var mp3Name = encodeURIComponent('yixueyilian_audio_' + new Date().getTime() + '.mp3');
    var duration = _self.$curWin.find('audio')[0].duration;
    var requeststr = {
      length: Math.ceil(duration)
    };
    requeststr = $.extend(requeststr, _self.args.options);
    fd.append('requeststr', JSON.stringify(requeststr));
    fd.append('mp3Name', mp3Name);
    fd.append('file', _self.mp3Blob);
    var xhr = new XMLHttpRequest();
    _self.$recordingslistInfo.html('上传中。。。,请勿连续点击');
    xhr.onreadystatechange = function() {
      _self.$recordingslistInfo.html('');
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          _self.$recordingslistInfo.html('');
          _self.btncancelHandler();
          _self.$btnUpload.data('disable', '1');
          _self.args.completeBack(xhr.responseText); //上传后处理
        } else {
          _self.$btnUpload.data('disable', '1');
          _self.$recordingslistInfo.html('上传失败,请重试');
        }
      }
    };
    xhr.open('POST', url);
    xhr.send(fd);
    setTimeout(function() {
      _self.$btnUpload.data('disable', '1');
    }, 2000);
  },
  log: function(str) {
    this.$recordingslistInfo.innerHTML += str + '<br/>';
  }
});
return RecordAudioWin;
