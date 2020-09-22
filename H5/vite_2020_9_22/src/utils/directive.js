/**
 * Desc: vue自定义指令
 */

import {
    isIos
} from './tool'

/**
 * vue自定义指令初始化
 * @param {Object} app vue实例化对象
 */
const vueDirectiveInit = (app) => {

    /*
     *  vue3.0自定义指令生命周期
     *  MyDirective = {
     *      beforeMount(el, binding, vnode, prevVnode) {},
     *      mounted() {},
     *      beforeUpdate() {},
     *      updated() {},
     *      beforeUnmount() {}, // new
     *      unmounted() {}
     *  }
     */


    /* 微信6.7.4 H5页面里的select,input软键盘弹起的时候页面会上移 */
    app.directive('input-dom', {
        beforeMount: function (el) {
            el.addEventListener('blur', () => {
                window.scrollTo(0, 0)
            })
        }
    });

    /* ios input软键盘弹起遮挡fix定位元素 */
    app.directive('fix-input', {
        beforeMount: function (el) {
            el.addEventListener('focus', () => {
                if (isIos()) {
                    window.setTimeout(scrollBottom, 500);
                }
            })

            function scrollBottom() {
                const body = document.querySelector('#app') // input所在的容器
                window.scrollTo(0, body.scrollHeight);
            }
        }
    });

    /* 禁止元素滚动事件 -- 解决滚动穿透问题：适用于不包含滚动元素的dom元素*/
    app.directive('scroll-forbid', {
        beforeMount: function (el) {
            el.addEventListener('touchmove', (e) => {
                // 滚动容器阻止冒泡，因此是否prevent由当前函数决定
                e.stopPropagation();
                let scrollEl = e.currentTarget;
                // 判定当前滚动容器是否可以滚动
                if (scrollEl.scrollHeight >= scrollEl.offsetHeight) {
                    // 不能滚动的时候依然需要阻止滚动穿透
                    e.preventDefault();
                }
            }, false);
        }
    });

    /* 滚动元素 */
    app.directive('scroll', {
        beforeMount: function (el) {
            el.classList.add('scroll');

            el.addEventListener('touchstart', function () {
                var top = el.scrollTop,
                    totalScroll = el.scrollHeight,
                    currentScroll = top + el.offsetHeight;
                if (top === 0) {
                    el.scrollTop = 1;
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1;
                }
            });

            el.addEventListener('touchmove', function (evt) {
                if (el.offsetHeight < el.scrollHeight)
                    evt._isScroller = true;
            });
        }
    });
}


export default vueDirectiveInit