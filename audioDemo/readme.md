# 网页录音项目

<pre>
1,recordFlashWav 是flash实现的网页录音功能，兼容大多数浏览器，就是录音效果不好
2，recordMp3 是h5的新api-webrtc实现的。只是chrome要求https和本地的权限。
3，这个项目是在fis2+backbone下实现的。有些依赖，有时间整理一下。
4,其他地方调用：（火狐使用recordMp3，其他浏览器用flash）
if (navigator.userAgent.toLowerCase().indexOf("firefox") > 0) { //如果是火狐浏览器
        this.recordAudio = new Mp3Recorder({
          options: {
            "padid": 1,
            "ptid": 2,
            "uid": 3
          },
          completeBack: function(data) {
            //上传后回调，做善后出来
          }
        });
      } else {
        this.recordAudio = new FlashRecorder({
          options: {
            "padid": 1,
            "ptid": 2,
            "uid": 3
          },
          completeBack: function(data) {
               //上传后回调，做善后出来
            if (typeof data == "string") {
              data = $.parseJSON(data);
            }
            
          }
        });
      }
</pre>

<p>
项目截图：

</p>
chrome下的效果图：<br/>

![image](https://github.com/webdzq/webdemo/raw/master/audioDemo/flashwav.png)<br/>

firefox下的效果图：<br/>

![image](https://github.com/webdzq/webdemo/raw/master/audioDemo/webrtcmp3.png)<br/>