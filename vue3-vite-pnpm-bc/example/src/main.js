import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import {BcDownloadList} from '@snail/busi-coms'
import businessComponent from '@snail/busi-coms'
// import  '@snail/busi-coms/dist/es/busi-coms.css'

const app = createApp(App)
app.use(businessComponent)
// app.component('BcDownloadList', BcDownloadList)
app.mount('#app')
