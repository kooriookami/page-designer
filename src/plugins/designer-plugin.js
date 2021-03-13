import formRules from '../assets/js/form-rules';
import schema from 'async-validator';

export default {
    install(app, options) {
        // 容器宽度
        // app.config.globalProperties.screenWidth = document.body.clientWidth;
        app.config.globalProperties.screenWidth = 400;
        // 组件列表
        app.config.globalProperties.moduleList = require('../assets/json/module-list');
        // 表单验证规则
        app.config.globalProperties.formRules = formRules;
        // 初始化form表单
        app.config.globalProperties.initForm = function (current, form) {
            Object.keys(form).forEach(value => {
                if (!current.hasOwnProperty(value)) {
                    current[value] = form[value];
                }
            });
        };
        // 表单校验
        app.config.globalProperties.validateForm = function (form, rules) {
            let validator = new schema(rules);
            return validator.validate(form).catch(err => {
                throw err;
            });
        };
        // 列表排序
        app.config.globalProperties.sortList = function (list) {
            if (Array.isArray(list)) {
                list.forEach((value, arr) => {
                    value.sort = arr;
                });
            }
        };
    }
};
