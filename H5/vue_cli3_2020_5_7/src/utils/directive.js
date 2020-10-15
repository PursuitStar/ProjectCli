/**
 * Desc: vue自定义指令
 */
 
import Vue from 'vue'
import {
    isIos
} from '@/utils/tool'

/* 微信6.7.4 H5页面里的select,input软键盘弹起的时候页面会上移 */
Vue.directive('input-dom', {
    inserted: function (el) {
        el.addEventListener('blur', () => {
            window.scrollTo(0, 0)
        })
    }
});

/* ios input软键盘弹起遮挡fix定位元素 */
Vue.directive('fix-input', {
    inserted: function (el) {
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
Vue.directive('scroll-forbid', {
    bind: function (el) {
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
Vue.directive('scroll', {
    bind: function (el) {
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