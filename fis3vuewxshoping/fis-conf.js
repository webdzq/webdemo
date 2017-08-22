"use strict";
const path = require("path");
const vueify = require("fis3-parser-vueify");
const parserVuePlugin = require("./parserVuePlugin/index");
fis.config.set("namespace", "wxshoping");
//由于使用了npm，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
fis.set("project.files", ["src/**", "map.json"]);
//FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
//有些第三方库不期望打包
fis.set("project.ignore", [
  "output/**",
  "node_modules/**",
  ".git/**",
  ".svn/**",
  "lib/**"
]);
fis.set("dist", "/wxshoping"); //wxshoping目录
// 添加cdn配置
const DOMAIN_STATIC = {
  domain: [
    "http://xxx1.abc.cn/res",
    "http://xxx2.abc.cn/res",
    "http://xxx3.abc.cn/res",
    "http://xxx4.abc.cn/res",
    "http://xxx5.abc.cn/res"
  ]
};
//FIS modjs模块化方案，您也可以选择amd/commonjs等
fis.hook("commonjs", {
  extList: [".js", ".es6", ".vue"],
  umd2commonjs: true,
  ignoreDependencies: []
});

// 禁用components，启用node_modules
fis.unhook("components");
fis.hook("node_modules");
// fis.hook('module', {
//     mode: 'mod'
// });

/*************************目录规范*****************************/
// 所有js文件
fis.match("**.js", {
  isMod: true,
  rExt: "js",
  useSameNameRequire: true
});
fis
  .match("**/*", {
    release: "${dist}/$&"
  })
  //一级同名组件，可以引用短路径，比如src/lib/jquery/juqery.js
  //直接引用为var $ = require('jquery');
  .match(/^\/src\/lib\/([^\/]+)\/\1\.(js)$/i, {
    id: "$1"
  })
  //前端模板,当做类js文件处理，可以识别__inline, __uri等资源定位标识
  .match("**/*.tmpl", {
    isJsLike: true,
    release: false
  })
  //页面模板不用编译缓存
  .match(/.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)$/, {
    useCache: false
  });
/****************html文件编译*****************/
fis.match("*.html", {
  release: "${dist}/$0"
});
/****************vue语言编译*****************/

fis.match("**.vue:js", {
  parser: [
    fis.plugin("babel-6.x", {
      presets: ["es2015-loose", "stage-3"],
      plugins: ["transform-vue-jsx"]
    }),
    fis.plugin("translate-es3ify", null, "append")
  ]
});
/****************异构语言编译*****************/
//less的编译
// npm install -g fis-parser-less-2.x

fis.match("{**.vue:css,**.vue:less,**.less}", {
  rExt: "css",
  useSameNameRequire: true,
  useHash: true,
  parser: [fis.plugin("less-2.x")],
  postprocessor: fis.plugin("autoprefixer")
});
// fis.match('**.js:css', {

//     useSameNameRequire: true,
//     useHash: true,
//     postprocessor: fis.plugin('autoprefixer')
// });

// fis.match('node_modules/{**.vue:less,**.less,**.vue:css,**.css}', {
//     rExt: 'css',
//     useSameNameRequire: true,
//     useHash: true,
//     parser: [fis.plugin('less-2.x')],
//     postprocessor: fis.plugin('autoprefixer')
// });
// fis.match(/^(.*)\/less\/(.*)$/i, {
//     useCache: false,
//     release: '${dist}/less/$0$1'
// })
// 编译vue组件

fis.match("*.vue", {
  isMod: true,
  rExt: "js",
  useSameNameRequire: true,
  parser: [
    function(content, file, conf) {
      conf.runtimeOnly = true;
      return parserVuePlugin(content, file, conf);
    }
  ]
  // parser: [
  //     fis.plugin("vue-component", {
  //         cssScopeFlag: "vuec"
  //     }),
  //     fis.plugin(
  //         vueify, {
  //             //extractCss: false // 默认是将css抽取出来的，这里是插入为style
  //         }
  //     )
  // ]
});
// vue组件中jsx片段处理。
fis.match("**.vue:jsx", {
  useSameNameRequire: true,
  parser: [
    fis.plugin("babel-6.x", {
      presets: ["es2015-loose", "stage-3"],
      plugins: ["transform-vue-jsx"]
    }),
    fis.plugin("translate-es3ify", null, "append")
  ]
});
// 所有js文件处理
fis.match("**.js", {
  useHash: true,
  useSameNameRequire: true,
  parser: [
    fis.plugin("babel-6.x", {
      presets: ["es2015-loose", "stage-3"]
    }),
    fis.plugin("translate-es3ify", null, "append")
  ]
});

/****************图片处理编译*****************/
fis.match("*.png", {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin("png-compressor")
});
// 加 md5
fis.match("*.{js,css,png,jpg}", {
  useHash: true
});
fis.match("node_modules/**.css", {
  useHash: true,
  isMod: true
});
// 非模块文件
fis.match("static/**.js", {
  parser: null,
  useHash: false,
  isMod: false
});
fis.match("src/lib/**.js", {
  parser: null,
  useHash: false,
  isMod: false
});
fis.match("src/lib/mint-ui.js", {
    parser: null,
    useHash: true,
    isMod: true
  });
// 页面直接引入的文件，不进行模块require包装
fis.match("/src/main.js", {
  isMod: false,
  parser: [
    fis.plugin("babel-6.x", {
      presets: ["es2015-loose", "stage-3"],
      plugins: ["transform-vue-jsx"]
    }),
    fis.plugin("translate-es3ify", null, "append")
  ]
});
//import xxx.css to import url(xxx.css);
fis.match("*.css", {
  parser: [
    function(content, file, conf) {
        let importCss=/^\@import.*?\.css"/;
        var target= content.replace(importCss,function(x,y){
               return "@import ("+x.split(" ")[0]+")";
        });
        return target;
        //continue single file compile，you can read the url http://fis.baidu.com/fis3/docs/user-dev/uri.html
    }
  ]
});
//打包与css sprite基础配置
fis.match("::packager", {
  // npm install [-g] fis3-postpackager-loader
  // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
  postpackager: fis.plugin("loader", {
    resourceType: "mod",
    useInlineMap: true // 资源映射表内嵌
  }),
  packager: fis.plugin("map"),
  spriter: fis.plugin("csssprites-group", {
    //图片缩放比例
    scale: 1,
    //1rem像素值
    rem: 50,
    // 默认单位
    unit: "px",
    //图之间的边距
    margin: 10,
    //使用矩阵排列方式，默认为线性`linear`
    layout: "matrix",
    //合并图片存到/img/
    to: "/image"
  })
});
//调试模式
fis.media("debug").match("*.{js,css,png}", {
  useHash: false,
  useSprite: false,
  optimizer: null
});
/**********************测试环境下*****************/

fis.media("qa").match("*", DOMAIN_STATIC); //添加cdn
/**********************生产环境下CSS、JS压缩合并*****************/
//使用方法 fis3 release prod
fis
  .media("prod")
  //注意压缩时.async.js文件是异步加载的，不能直接用annotate解析
  .match("*", DOMAIN_STATIC)
  .match("**.js", {
    preprocessor: fis.plugin("annotate"),
    optimizer: fis.plugin("uglify-js")
  })
  .match("/**(.async).js", {
    preprocessor: null,
    optimizer: null
  })
  .match("::package", {
    spriter: fis.plugin("csssprites-group")
  })
  .match("**.css", {
    useSprite: true,
    optimizer: fis.plugin("clean-css")
  })
  .match("*.png", {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin("png-compressor")
  })
  .match("*.{js,css,png}", {
    useHash: true
  })
  .match("lib/mod.js", {
    packTo: "/pkg/vendor.js"
  })
  //所有页面中引用到的bower js资源
  .match("node_modules/**/*.js", {
    packTo: "/pkg/vendor.js"
  })
  //所有页面中引用到的bower css资源
  .match("node_modules/**/*.css", {
    packTo: "/pkg/vendor.css"
  });
/**********************工程代码远程发布*****************/
//fis3-deploy-http-push-strong示例代码：(与fis2的deploy类似的)

fis
  .media("publish")
  .match("*", DOMAIN_STATIC)
  .match(
    "src/lib/**.js",
    {
      domain: false // 不加cdn
    },
    100
  )
  .match("*", {
    deploy: [
      fis.plugin("http-push-strong", [
        {
          receiver: "http://cq.01.p.p.baidu.com:8888/receiver.php",
          to: "/home/work/htdocs/static",
          from: "/static"
        },
        {
          receiver: "http://cq.01.p.p.baidu.com:8888/receiver.php",
          to: "/home/work/jello",
          from: "/WEB-INF"
        },
        {
          receiver: "http://cq.01.p.p.baidu.com:8888/receiver.php",
          to: "/home/work/img",
          from: "/img"
        }
      ])
    ]
  });
