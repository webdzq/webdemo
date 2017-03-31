/**
 * @fileOverview Runtime管理器，负责Runtime的选择, 连接
 */


function CompBase(owner, runtime) {
    this.owner = owner;
    this.options = owner.options;
    this.getRuntime = function () {
        return runtime;
    };
    this.getRuid = function () {
        return runtime.uid;
    };
    this.trigger = function () {
        return owner.trigger.apply(owner, arguments);
    };
}
module.exports = CompBase || module.exports;;