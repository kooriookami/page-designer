import {addResizeListener} from 'element-plus/lib/utils/resize-event';

export default {
    install(app, options) {
        app.config.globalProperties.priceFormatter = function (row, column, cellValue, index) {
            if (typeof cellValue === 'number') {
                return '￥' + (cellValue / 100).toFixed(2);
            }
            return cellValue;
        };
        // 固定长宽比指令
        app.directive('ratio', {
            mounted(el, binding) {
                addResizeListener(el, () => {
                    const ratio = binding.value || 1;
                    el.style.height = `${el.clientWidth / ratio}px`;
                });
            }
        });
    }
};
