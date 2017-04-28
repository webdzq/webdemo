'use strict';
var path = require('path');
fis.require('jello')(fis)
fis.config.set("namespace", "fisvue");
var vueify = require("fis3-parser-vueify");


const DOMAIN_STATIC = {
        domain: [
            'http://s1.abc.cn/res', 'http://s2.abc.cn/res', 'http://s3.abc.cn/res', 'http://s4.abc.cn/res',

        ]
    }
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

// 禁用components，启用node_modules
fis.unhook('components');
fis.hook('node_modules');
//前端模板tmpl的使用
fis.match('**.tmpl', {
    parser: fis.plugin('utc'), // invoke `fis-parser-utc`
    isJsLike: true
});
fis.match('*.{html,js,vm,less,css}', {
    useSameNameRequire: true
});
// 所有js文件
fis.match('**.js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true
});

// 编译vue组件
fis.match('widget/**.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: fis.plugin(vueify, {
            //extractCss: false // 默认是将css抽取出来的，这里是插入为style
        }) //parserVuePlugin
});

//.vue中的js处理
fis.match('widget/**.vue:js', {
    parser: [
        fis.plugin('babel-6.x', {
            presets: ['es2015-loose', 'stage-3'],
            plugins: ["transform-vue-jsx"]
        }),
        fis.plugin('translate-es3ify', null, 'append')
    ]
})

// fis.match('widget/**.vue:jade', {
//     parser: [
//         fis.plugin('jade', {
//             //
//         })
//     ]
// })

fis.match('widget/{**.vue:less,**.less}', {
    rExt: 'css',
    parser: [fis.plugin('less-2.x')],
    postprocessor: fis.plugin('autoprefixer')

});


// 模块文件
fis.match('widget/**.js', {
    parser: [
        fis.plugin('babel-6.x', {
            presets: ['es2015-loose', 'stage-3'],
            plugins: ["transform-vue-jsx"]
        }),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});
//FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
//有些第三方库不期望打包
fis.set('project.ignore', [
    'output/**',
    'node_modules/**',
    '.git/**',
    '.svn/**',
    'lib/**'

]);

// 非模块文件
fis.match('static/**.js', {
    parser: null,
    isMod: false
});
// //需要混淆的文件
// fis.match('*.js', {
//     optimizer: fis.plugin('uglify-js')
// });
// //不期望混淆的文件
// fis.match('exclude.js', {
//     optimizer: null
// });
//fis.match('widget/ueditor/**/{ueditor.css, codemirror.{js, css}}', {useHash: false}, 101);

//调试环境不加md5
fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
})

//发布到测试环境
fis.media('QA').match('*.vm', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://main.zgjiaoyan.com/ebook/upload',
            to: '/App/src/SRT/sanke/frontend/target/sanke-frontend/jello'
        })
    })
    .match('!*.vm', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://main.zgjiaoyan.com/ebook/upload',
            to: '/opt/yanxiu/static'
        })
    });
/**
 
//自我mac上node环境调试
//所有jello模板文件
fis.match('*.vm', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://192.168.9.137:8999/receiver',
        //远端目录
        to: '/Users/srt/receiver/'
    })
});
//所有非jello模板文件
fis.match('!*.vm', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://192.168.9.137:8999/receiver',
        //远端目录
        to: '/Users/srt/receiver/'
    })
});
//所有文件
fis.match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://192.168.9.137:8999/receiver',
        //远端目录
        to: '/Users/srt/receiver/'
    })
});
* 
 */
//fis.media(QA).match('*', DOMAIN_STATIC);//添加cdn
/**
 * 扩展：fis3与fis2不同的地方就是：1，fis3没有from，只有to，可以通过data来拓展参数。
 * 
 * 2，match匹配的是开发路径下的目录和文件，fis2使用了发布后的目录和文件
 * 3，如果我们使用jello，fis3却很难实现发布后的目录与fis2一样。可以根据from来指定static和WEB-INF的目录，发布
 * 到指定的服务器。(from是jello发布后的目录，to是开发工程的目录)
 * 4，对于3中需求，我们只能修改接收端的server.js。做目录的过滤和定向。
 * 5,来源的接收端，可以从fis3官网下载。修改后的文件详见 receiver/server_update.js
 * 6,以上这种方案并非最好，所以添加了fis3新插件fis3-deploy-http-push-strong（：https://www.npmjs.com/package/fis3-deploy-http-push-strong）
 *  
 */
fis.match('*.vm', {
    domain: false
}, 100);

fis.media('sever').match('*', DOMAIN_STATIC).match('**', {
    deploy: [
        fis.plugin('http-push', {
            receiver: 'http://127.0.0.1:8999/receiver',
            to: '/Users/srt/receiver/webb',
            data: {
                from: '/static'
            }
        }),
        fis.plugin('http-push', {
            receiver: 'http://127.0.0.1:8999/receiver',
            to: '/Users/srt/receiver/weba',
            data: {
                from: '/WEB-INF'
            }
        })
    ]
});
//fis3-deploy-http-push-strong示例代码：(与fis2的deploy类似的)
fis.media('strong').match('*', {
    deploy: [
        fis.plugin("http-push-strong", [{
                receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
                to: '/home/work/htdocs/static',
                from: "/static"
            }, {
                receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
                to: '/home/work/jello',
                from: "/WEB-INF"
            },
            {
                receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
                to: '/home/work/img',
                from: "/img"
            }
        ])
    ]
})



/**
 * 
 * 参考代码
 'use strict';

fis.require('jello')(fis);
fis.config.set("namespace", "harmony");

let QA = 'qa',
	PRODUCTION = 'production',
	DOMAIN_STATIC = {
		domain: [
			
		]
	},
	USE_HASH = {
		useHash: true
	};
let Plugin = function(key, plugin, option) {
	return {
		[key]: plugin ? fis.plugin(plugin, option) : false
	};
};
let Optimizer = function(plugin) {
	return Plugin('optimizer', plugin);
};
let Parser = function(plugin, option, rExt) {
	let props = rExt ? {
		rExt
	} : {};
	Object.assign(props, Plugin('parser', plugin, option));
	return props;
};

//权重设计：默认1(0?),同节点之内的提升用10,节点之间的提升用100

//dev(通用)
fis.match('*.{js,css,less}', USE_HASH);
fis.match('*.vm', {
	domain: false
}, 100);

fis.match('*.js',
	Parser('babel-5.x', {
		blacklist: ['regenerator'],
		sourceMaps: true,
		compact: false,
		stage: 3
	}, 'js'));
fis.match('widget/es5/**.js',
	Parser(false), 10);

fis.match('widget/es5/ueditor/
{ ueditor.css, codemirror. { js, css } }
', {useHash: false}, 101);
//qa
fis.media(QA).match('*', DOMAIN_STATIC);

//production
fis.media(PRODUCTION).match('*', DOMAIN_STATIC);
fis.media(PRODUCTION).match('*.{js,css,less}', USE_HASH);
fis.media(PRODUCTION).match('::image', USE_HASH);
fis.media(PRODUCTION).match('*.js', Optimizer('uglify-js'));
fis.media(PRODUCTION).match('*.css', Optimizer('clean-css'));
fis.media(PRODUCTION).match('*.png', Optimizer('png-compressor'));

/*fis.media('dev')
	.match('*', {
		useHash: false,
		optimizer: null
	});*/

/*fis.config.set('roadmap.path', [{
	reg: /^\/components\/.*\.(?:less|md)$/i,
	release: false
}, {
	reg: /(package|component)\.json$/,
	release: false
}, {
	reg: '**.md',
	release: false
}].concat(fis.config.get('roadmap.path', [])));*/

/*fis.media('dev').match('/static', {
	deploy: fis.plugin('http-push', {
		receiver: 'http://pingbi_local_backend.yanxiu.com/upload',
		to: '/opt/yanxiu/static/harmony'
	})
});

fis.media('dev').match('/WEB-INF', {
	deploy: fis.plugin('http-push', {
		receiver: 'http://pingbi_local_backend.yanxiu.com/upload',
		to: '/opt/yanxiu/workselect/trunk/backend/src/main/webapp'
	})
});
*/