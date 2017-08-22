// import Vue from "vue";
import Vue from 'vue/dist/vue.js'
import Index from "widget/index";
import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css'

import VueRouter from 'vue-router';
import MintUI from 'mint-ui';


// __inline('muse-ui/dist/muse-ui.css');
// __inline('node_modules/mint-ui/lib/style.css');

// import MintUI from 'mint-ui';
// const css2=__inline('mint-ui/lib/style.css');




const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});
Vue.use(MintUI);
Vue.use(MuseUI);

Vue.use(VueRouter);
const app = new Vue({
  router,
  el: '#appfis',
  render(h){
    return (<Index></Index>);
  }
});


// Vue.use(Mint);//引人有问题：vue中css无法处理
// const app = new(Vue.extend(Index))({
//     router
    
// }).$mount();
// document.getElementById("appfis").appendChild(app.$el);
// // Vue.use(MintUI);

// new Vue({
//     el: '#appfis',
//     data: {},
//     compnents: {‘app’:Index}
// })
// new Vue({
//     el: '#appfis',
//     data: {},
//     compnents: {
//         'App': {
//             template: '<div>this is compnent</div>',//html字符串模版
//             props: [],//父子组件通过props进行数据绑定
//             data: function (){  //组件的data属性必须是函数，详解见官网
//                 return {
                 
//                 }
//             }
//         }
//     }
// })