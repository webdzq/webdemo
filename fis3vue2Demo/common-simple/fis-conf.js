'use strict';
fis.require('jello')(fis)
fis.config.set("namespace", "common-simple");
fis.config.set('modules.postprocessor.js', 'amd');

// 模块化支持插件
// https://github.com/fex-team/fis3-hook-commonjs (forwardDeclaration: true)
fis.hook('commonjs', {
  extList: [
    '.js', '.coffee', '.es6', '.jsx', '.vue',
  ],
  umd2commonjs: true,
  ignoreDependencies: [
  ]
});


 // 模块化所有js文件
 fis.match('**.js', {
   isMod: true,
   rExt: 'js',
   useSameNameRequire: true
 });


 // 非模块js文件
 fis.match('/static/**.js', {
   parser: null,
   isMod: false
 });
