<template>
 <div>
    <a  id="upload-picker" href="#">{{uploadButton}}</a> <a href="#" @click="reset">重置</a>
    <el-progress :percentage="0" v-if="progressShow"></el-progress>
    <div class="file-container">
      <div class="file-item"  v-for="fileitem in filelist" >
          <a classs="el-icon-circle-check">{{fileitem.name}}</a><a href="#" @click="deletefile" ><i class="el-icon-delete"></i></a>
      </div>
    </div>
 </div>
</template>
<script>
import Vue from 'vue';
import { Button, Select,Progress,Icon} from 'element-ui';
let Webuploader = require("common-simple:widget/uploader/uploader.js");

Vue.component(Progress.name, Progress);
Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

let defaultMarkInfo={};
let markInfo={};
var uploader;
Webuploader.initConfig($.extend({
    from: 6,
    shareType: 0
},defaultMarkInfo,markInfo),{},{uid:12121});

export default {
    data(){
      return {
        progressShow:false,
        filelist:[],
        uploadButton:"上传"
      }
    },
    mounted(){
      let me=this;
       uploader = Webuploader.Uploader.create({
          pick: "#upload-picker",
          auto: true,
          fileNumLimit: 1,
          runtimeOrder: "html5,flash"
      });
      //
      uploader.on("fileQueued", function(file){
         me.fileQueued(file);
      });
      //文件加载进度
      uploader.on("md5fileProgress", function(file, percent){
        me.md5fileProgress(file,percent);
      });
      //文件上传进度
      uploader.on("uploadProgress", function(file, percent){
        me.uploadProgress(file, percent);
      });
      uploader.on("uploadFileFinish", function(file){
        me.uploadFileFinish(file);
      });
      uploader.on("uploadFinished", function(file){
        me.uploadFinished(file);

      });
      uploader.on("uploadError", function(file, res){
      	if(res == "FILE_EXIST"){
      		//do nothing
      		// 注意这个，其实不是失败了，而是文件存在的秒传
      	} else {
      		alert("uploadError "+res);
      	}
      });
      uploader.on("fileDequeued", function(file){
      	// var fileView = $con.find('[data-id="'+file.id+'"]');
      	// fileView.remove();
      });
      uploader.on("error", function(res){
      	if(res == "Q_TYPE_DENIED"){
      		// var file = arguments[1];
      		// alert(file.name +("文件类型不符或者是空文件"));

      	} else {
      		// var file = arguments[2];
      		// var max = arguments[1];
      		// alert(file.name + "最多只能选择"+max+"个，已超出");
      	}
      });
    },
    methods: {
        //
        reset:()=>{
          uploader.reset();
        },
        fileQueued:(file)=>{},
        md5fileProgress:(file,percent)=>{
          console.log("md5:"+(percent.toFixed(2) * 100));
        },
        uploadProgress:(file,percent)=>{
          console.log(percent.toFixed(2) * 100);
        },
        uploadFileFinish(file){
            this.updatefile(file);
        },
        uploadFinished:()=>{
          alert("已选择文件都传完了");
        },
        updatefile(file){
          this.deletefile();
          this.addfile(file);
        },
        addfile(file){
          this.filelist.push(file);
        },
        deletefile(){
          this.filelist.splice(0,this.filelist.length);
          $(".webuploader-pick").text("重新上传");
          this.reset();
        }
    }
  }
</script>
