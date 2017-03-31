/**
 * @fileOverview 图片压缩
 */



var FlashRuntime = require('./runtime');
module.exports = FlashRuntime.register('Image', {
    // init: function( options ) {
    //     var owner = this.owner;
    //     this.flashExec( 'Image', 'init', options );
    //     owner.on( 'load', function() {
    //         debugger;
    //     });
    // },
    loadFromBlob: function (blob) {
        var owner = this.owner;
        owner.info() && this.flashExec('Image', 'info', owner.info());
        owner.meta() && this.flashExec('Image', 'meta', owner.meta());
        this.flashExec('Image', 'loadFromBlob', blob.uid);
    }
}) || module.exports;;