import 'element-plus/dist/index.css';
import './assets/main.scss';
import './assets/element.scss';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');