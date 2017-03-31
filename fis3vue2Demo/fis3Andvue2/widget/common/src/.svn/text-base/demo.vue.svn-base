<template>
<div class="gjjy-demo">
  <div class="upload">
      <div class="">
        #single-upload 单文件上传
      </div>
    <yx-single-upload v-bind:markinfo="markinfo"  v-on:mark-success="markSuccess" v-on:mark-err="markErr"></yx-single-upload>
    <a href="#" @click="markFile">markfie</a>
  </div>
############################################################
  <div class="msg">
   <div>
      #msg 消息框
   </div>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
  </div>
############################################################
 <div class="table">
   <div class="">
     #check-table 选择列表
   </div>
   <div class="">
     <yx-check-table></yx-check-table>
   </div>
 </div>
 ###########################################################
 <div class="pagination">
   <div class="">
     #pagination 分页
   </div>
   <el-pagination
  layout="prev, pager, next"
  :total="1000" @current-change="currentChange">
  </el-pagination>
 </div>
 #############################################################
 <div class="Popup">
   <div class="">
     #popup 弹出层
     <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item><el-form-item>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
   </div>
 </div>
</div>
</template>
<script>
  import Vue from 'vue';
  import { Button,Message,Pagination,Form,Select,Option,Dialog,FormItem} from 'element-ui';
  import YXSingleUpload from './component/single-upload/single-upload';
  import YXCheckTable from './component/check-table/check-table'


  Vue.component(Button.name, Button);
  Vue.component(Pagination.name, Pagination);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Select.name, Select);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Option.name,Option);


  export default {
    data:()=>{
      return{
        markinfo:"haha",
        dialogVisible:false,
        formInline: {
         user: '',
         region: ''
       }
      }
    },
    components:{
       "yx-single-upload":YXSingleUpload,
       "yx-check-table":YXCheckTable
    },
    methods:{
      markFile(){
        this.markinfo={
          title:"",
          categoryIds:"1202,1102,1402,1301,1702",
          chapter:"",
          description:""
        };
      },
      markSuccess(file){
          alert("marksucess:"+file)
      },
      markErr(err){
          alert("markErr:"+err)
      },
      open() {
        Message('这是一条消息提示');
      },
      open2() {
        Message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
      open3() {
        Message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open4() {
        Message.error('错了哦，这是一条错误消息');
      },
      currentChange(currentPage){
        alert("当前页数："+currentPage);
      }
    }
  }
</script>
