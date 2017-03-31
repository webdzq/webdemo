/**
 * @fileOverview 只有flash实现的文件版本。
 */



var Base = require('../base');
require('../widgets/filepicker');
require('../widgets/image');
require('../widgets/queue');
require('../widgets/runtime');
require('../widgets/upload');
require('../widgets/validator');
require('../runtime/flash/filepicker');
require('../runtime/flash/image');
require('../runtime/flash/blob');
require('../runtime/flash/transport');
module.exports = Base || module.exports;;