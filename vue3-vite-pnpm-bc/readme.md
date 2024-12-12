# 安装

```shell
pnpm i mth-admin-vue3-components
```
# 使用

```js
// main.js
import businessComponent from "mth-admin-vue3-components";
import "mth-admin-vue3-components/dist/es/mth-admin-vue3-components.css";

app.use(businessComponent);
```
# 组件

## bcAddDownload
增加下载列表
```js
import { bcAddDownload } from 'mth-admin-vue3-components'

bcAddDownload(
        {
            userId: '111', // 必传
            ...others
        },
        headers // 请求头参数, 非必传
    )
```
## 下载列表管理

```html
<template>
  <!-- userId: 用户id，参数必传；reqHeaders：请求头参数，非必传 -->
  <BcDownlaodList 
    :user-id="111" 
    :req-headers="{ authorization: 'a629a6d88ac14ea28455ca9a9dd08f37' }"
  />
</template>

<script setup>
import { BcDownlaodList } from 'mth-admin-vue3-components';
</script>

```

