import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import Vant from 'vant';
import 'vant/lib/index.css';
import _ from 'lodash';
import axios from './core/axios';
import {v4 as uuid} from 'uuid';
import base from './plugins/base';
import designerPlugin from './plugins/designer-plugin';

const app = createApp(App);

app.config.globalProperties.$_ = _;
app.config.globalProperties.axios = axios;
app.config.globalProperties.uuid = uuid;

app.use(ElementPlus, {locale});
app.use(Vant);
app.use(store);
app.use(base);
app.use(designerPlugin);
app.mount('#app');
