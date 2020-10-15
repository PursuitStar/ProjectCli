/**
 * Desc: 插件
 */

/**
 *  @desc 解决click 300ms延迟
 *  @repository https://github.com/ftlabs/fastclick
 * 
 *  @warn ios环境使用 fastclick input聚焦延迟解决方案
 *  @link https://github.com/ftlabs/fastclick/issues/583
  
 *  @warn vue-cli3X 使用fastclick 报错解决方案
 *  @link https://github.com/DefinitelyTyped/DefinitelyTyped/pull/6938/commits/985fe32972172ba9286ffcc02efb5be4710f954e
 */
import FastClick from 'fastclick';
FastClick.attach(document.body);
FastClick.prototype.focus = (ele) => {
    'use strict';
    ele.focus();
};