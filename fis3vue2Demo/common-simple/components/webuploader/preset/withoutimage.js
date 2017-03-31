/**
 * @fileOverview 没有图像处理的版本。
 */



var Base = require('../base');
require('../widgets/filednd');
require('../widgets/filepaste');
require('../widgets/filepicker');
require('../widgets/queue');
require('../widgets/runtime');
require('../widgets/upload');
require('../widgets/validator');
require('../runtime/html5/blob');
require('../runtime/html5/dnd');
require('../runtime/html5/filepaste');
require('../runtime/html5/filepicker');
require('../runtime/html5/transport');
require('../runtime/flash/filepicker');
require('../runtime/flash/transport');
require('../runtime/flash/blob');
module.exports = Base || module.exports;;