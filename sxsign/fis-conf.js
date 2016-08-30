// 设置空间
fis.config.set("namespace", "sxsign");
fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');

// --------------------------------
// 支持 amd 设置
// --------------------------------
fis.config.set('modules.postprocessor.vm', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('modules.postprocessor.jsp', 'amd');


// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');
// 配置打包策略
fis.config.set('pack', {

    // js
    'pkg/static.css': ['widget/static/**.css', 'widget/static/**.less'],
    'pkg/static/lib.js': ['widget/static/lib/**.js'],
    'pkg/comm.css': ['widget/comm/**.css', 'widget/comm/**.less'],
    'pkg/comm.js': ['widget/comm/**.js'],

    'pkg/checkInfo/checkInfo.css': ['widget/checkInfo/**.css', 'widget/checkInfo/**.less'],
    'pkg/checkInfo/checkInfo.js': ['widget/checkInfo/view/**.js'],

    'pkg/registerInfo/registerInfo.css': ['widget/registerInfo/**.css', 'widget/registerInfo/**.less'],
    'pkg/registerInfo/registerInfo.js': ['widget/registerInfo/**.js'],

    'pkg/signIn/signIn.css': ['widget/signIn/**.css', 'widget/signIn/**.less'],
    'pkg/signIn/signIn.js': ['widget/signIn/**.js']



});

// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');

//fis.config.set('roadmap.domain', [
//    'http://s1.jsyxw.cn/res', 'http://s2.jsyxw.cn/res', 'http://s3.jsyxw.cn/res', 'http://s4.jsyxw.cn/res',
//    'http://s5.jsyxw.cn/res', 'http://s6.jsyxw.cn/res', 'http://s7.jsyxw.cn/res', 'http://s8.jsyxw.cn/res',
//    'http://s9.jsyxw.cn/res', 'http://s10.jsyxw.cn/res', 'http://s11.jsyxw.cn/res', 'http://s12.jsyxw.cn/res',
//    'http://s13.jsyxw.cn/res', 'http://s14.jsyxw.cn/res', 'http://s15.jsyxw.cn/res'
//
//]);

//fis.config.set('roadmap.domain', 'http://front.yanxiu.com');

fis.config.set('roadmap.path', [

    {
        reg: /^\/components\/.*\.(?:less|md)$/i,
        release: false
    }, {
        reg: /(package|component)\.json$/,
        release: false
    }, {
        reg: '**.md',
        release: false
    }
].concat(fis.config.get('roadmap.path', [])));


//fis.config.merge({
//
//    deploy: {
//        remote: [{
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/static',
//                to: '/opt/yanxiu/train-front/frontend/src/main/webapp'
//            },
//
//            {
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/WEB-INF',
//                to: '/opt/yanxiu/train-front/frontend/src/main/webapp/jello'
//            }
//        ],
//        dev: [{
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/static',
//                to: '/opt/yanxiu/static'
//            },
//
//            {
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/WEB-INF',
//                to: '/opt/yanxiu/train-front/frontend/src/main/webapp/jello'
//            }
//        ],
//        dev_zsj: [{
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/static',
//                to: '/opt/yanxiu/static'
//            },
//
//            {
//                receiver: 'http://front.yanxiu.com/upload',
//                from: '/WEB-INF',
//                to: '/opt/yanxiu/train-front-zsj/frontend/src/main/webapp/jello'
//            }
//        ],
//        local: [{
//            receiver: 'http://localhost:8000/upload',
//            from: '/static',
//            to: '/Users/yunwei/.jello-tmp/www/s-s-t'
//        }]
//
//    }
//});
