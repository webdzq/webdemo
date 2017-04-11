//(function(exports) {
var MP3Recorder = function(config) {
    var recorder = this;
    config = config || {};
    config.sampleRate = config.sampleRate || 44100;
    config.bitRate = config.bitRate || 128;
    //兼容各个浏览器
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    var userAgent = navigator.userAgent,
        msgTitle = '提示',
        notSupport = '对不起，您的浏览器不支持摄像头/麦克风，请使用火狐浏览器';
    //媒体请求的参数，video:true表示调用摄像头，audio:true表示调用麦克风
    var option = {
        audio: true
    };
    //console.log(navigator.getUserMedia);
    try {
        if (navigator.getUserMedia) {
            if (userAgent.indexOf('MQQBrowser') > -1) {
                errCallBack({ NOT_SUPPORTED_ERROR: 1 });
                return false;
            }
            navigator.getUserMedia(option, sucCallBack, errCallBack);
        } else {
            if (config.funCancel) {
                config.funCancel('当前浏览器不支持录音功能');
            }
        }
    } catch (ex) {
        errCallBack({ NOT_SUPPORTED_ERROR: 1 });
        return false;
    }

    function sucCallBack(stream) {
        //console.log("stream=", stream);
        var context = new AudioContext(),
            microphone = context.createMediaStreamSource(stream),
            processor = context.createScriptProcessor(16384, 1, 1), //bufferSize大小，输入channel数，输出channel数
            mp3ReceiveSuccess,
            currentErrorCallback;
        config.sampleRate = context.sampleRate;
        processor.onaudioprocess = function(event) {
            //边录音边转换
            var array = event.inputBuffer.getChannelData(0);
            realTimeWorker.postMessage({ cmd: 'encode', buf: array });
        };
        var baseurl = window.location.protocol + '//' + window.location.hostname;
        //var baseurl = '';
        //console.log("baseurl..=", baseurl);
        var url = baseurl + '/static/js/public/audiocore/workerRealtime.js'; //根据实际情况写路径
        var realTimeWorker = new Worker(url);
        realTimeWorker.onmessage = function(e) {
            switch (e.data.cmd) {
                case 'init':
                    log('初始化成功');
                    if (config.funOk) {
                        config.funOk();
                    }
                    break;
                case 'end':
                    log('MP3大小：', e.data.buf.length);
                    if (mp3ReceiveSuccess) {
                        mp3ReceiveSuccess(new Blob(e.data.buf, { type: 'audio/mp3' }));
                    }
                    break;
                case 'error':
                    log('错误信息：' + e.data.error);
                    if (currentErrorCallback) {
                        currentErrorCallback(e.data.error);
                    }
                    break;
                default:
                    log('未知信息：', e.data);
            }
        };
        recorder.getMp3Blob = function(onSuccess, onError) {
            currentErrorCallback = onError;
            mp3ReceiveSuccess = onSuccess;
            realTimeWorker.postMessage({ cmd: 'finish' });
        };
        recorder.start = function() {
            if (processor && microphone) {
                microphone.connect(processor);
                processor.connect(context.destination);
                log('开始录音');
            }
        };
        recorder.stop = function() {
            if (processor && microphone) {
                microphone.disconnect();
                processor.disconnect();
                log('录音结束');
            }
        };
        realTimeWorker.postMessage({
            cmd: 'init',
            config: {
                sampleRate: config.sampleRate,
                bitRate: config.bitRate
            }
        });
    }

    function errCallBack(error) {
        var msg;
        switch (error.code || error.name) {
            case 'PERMISSION_DENIED':
            case 'PermissionDeniedError':
                msg = '您拒绝了访问麦客风';
                break;
            case 'NOT_SUPPORTED_ERROR':
            case 'NotSupportedError':
                msg = '您的浏览器不支持使用麦克风，请使用火狐浏览器尝试';
                break;
            case 'MANDATORY_UNSATISFIED_ERROR':
            case 'MandatoryUnsatisfiedError':
                msg = '找不到麦客风设备';
                break;
            default:
                //msg = '无法打开麦克风，异常信息:' + (error.code || error.name);
                msg = '没有检测到麦克风，请确认设备配置';
                break;
        }
        if (config.funCancel) {
            config.funCancel(msg);
        }
    }

    function log(str) {
        if (config.debug) {
            console.log(str);
        }
    }
};
//exports.MP3Recorder = MP3Recorder;
return MP3Recorder;
//})(window);;