import './assets/base.scss'

import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
//单独引入loading 样式
import 'element-plus/theme-chalk/el-loading.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
