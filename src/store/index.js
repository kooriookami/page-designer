import {createStore} from 'vuex';

export default createStore({
    state: {
        pageInfo: {
            id: '',
            component: 'Page',
            name: '页面名 ' + new Date().getTime(),
            remarks: '',
            backgroundColor: '#f5f5f5',
            components: []  // 提交时下面的components合并到此
        },   // 页面的配置信息
        components: [],  // 使用的组件列表
        current: {},  // 当前选中的组件
        scrollId: '',    // 滚动到目标组件
        validateKey: 0 // 监听该值，触发form校验
    },
    mutations: {
        setPageInfo(state, value) {
            state.pageInfo = value;
        },
        setComponents(state, value) {
            state.components = value;
        },
        setCurrent(state, value) {
            state.current = value;
        },
        setScrollId(state, value) {
            state.scrollId = value;
        },
        setValidateKey(state) {
            state.validateKey++;
        }
    }
});
