
<style lang="less" scoped>
  @import "less/other.less"; 
@import "less/other.css";
  .index {
    >p {
      line-height: 50px;
      text-align: center;
      background: rgb(240, 203, 210);
      border: 1px solid #ddd;
    }
  }
  .__vuec__ {
    color: red;
  }
</style>


<style lang="less">

</style>

<template>
  <div class="index">
    <p>fis3-parser-vue-component demo runing ~</p>
    <!-- <div>
            <mt-button @click.native="handleClick">按钮</mt-button>
             <mt-button type="default">default</mt-button>
             <mt-button type="primary">primary</mt-button>
             <mt-button type="danger">danger</mt-button>
         </div> -->
    <div>
      <h1>Hello vue-router!</h1>
        <p>
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
          <router-link to="/foo">Go to Foo</router-link>
          <router-link to="/bar">Go to Bar</router-link>
        </p>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
    <component-a></component-a>
    <component-b></component-b>
    <component-c></component-c>
    <test-bug></test-bug>
    <mint-b></mint-b>
    <div class="__vuec__">
      cssScopedFlag test, color red !
    </div>
    
  </div>
</template>

<script>
  import ComponentA from './a';
  import ComponentB from './b';
  import TestBug from './test-bug';
  import MintB from './mint';
 


  // @require '../less/other2.less';


  export default {
    components: {
      ComponentA,
      ComponentB,
      TestBug,
      MintB,
      ComponentC: require('./c').default
    },
    created() {
      console.log('Index page created!');
      
    },
    methods: {
      
        handleClick: function() {
          this.$toast('Hello world!')
        }
      
    }
  }
</script>
