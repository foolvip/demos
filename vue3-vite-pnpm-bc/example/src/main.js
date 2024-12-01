import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

// import {BcDownloadList} from '@snail/busi-coms'
import businessComponent from "busi-coms-vue3-pnpm";
import "busi-coms-vue3-pnpm/dist/es/busi-coms-vue3-pnpm.css";

const app = createApp(App);
app.use(businessComponent);
// app.component('BcDownloadList', BcDownloadList)
app.mount("#app");
