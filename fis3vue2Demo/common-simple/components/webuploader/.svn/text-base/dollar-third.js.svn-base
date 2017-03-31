/**
 * @fileOverview jQuery or Zepto
 */


var req = window.require;
var $ = window.__dollar || window.jQuery || window.Zepto || req('jquery') || req('zepto');
if (!$) {
    throw new Error('jQuery or Zepto not found!');
}
module.exports = $ || module.exports;;