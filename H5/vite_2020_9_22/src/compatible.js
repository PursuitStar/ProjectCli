/**
 * Desc: 兼容处理
 */


/**
 * @desc    解决click 300ms延迟
 * @remark  修改源码：330行
 * 
 * FastClick.prototype.focus = function (targetElement) {
        var length;
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;

            @editStart
            // =========================== 修改区-start ============================
            targetElement.focus();
            // ============================ 修改区-end =============================
            @editEnd
        
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };
 */
import fastClick from 'fastclick';
fastClick(document.body);