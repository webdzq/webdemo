/**
 * @fileOverview DragAndDrop Widget。
 */



var Base = require('../base');
var Uploader = require('../uploader');
var Dnd = require('../lib/dnd');
require('./widget');
var $ = Base.$;
Uploader.options.dnd = '';
module.exports = Uploader.register({
    name: 'dnd',
    init: function (opts) {
        if (!opts.dnd || this.request('predict-runtime-type') !== 'html5') {
            return;
        }
        var me = this, deferred = Base.Deferred(), options = $.extend({}, {
                disableGlobalDnd: opts.disableGlobalDnd,
                container: opts.dnd,
                accept: opts.accept
            }), dnd;
        this.dnd = dnd = new Dnd(options);
        dnd.once('ready', deferred.resolve);
        dnd.on('drop', function (files) {
            me.request('add-file', [files]);
        });
        // 检测文件是否全部允许添加。
        dnd.on('accept', function (items) {
            return me.owner.trigger('dndAccept', items);
        });
        dnd.init();
        return deferred.promise();
    },
    destroy: function () {
        this.dnd && this.dnd.destroy();
    }
}) || module.exports;;