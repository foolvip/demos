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
            userId: '111', // 用户ID, 必传
            queryType: 'core-test', // 业务查询策略，必传
            t: {  head: [["姓名","name"]]  }, // t: 预留参数，非必传
            ...others, // 其他参数， 非必传
        },
        config: {
          baseUrl: '/insure-api', // baseUrl是接口服务前缀， 必传,
          ...others, // 其他参数， 非必传
        },
        headers， // 请求头参数, 非必传
    )
```
## 下载列表管理

```html
<template>
  <!-- 
    userId: 用户id，参数必传；
    reqData: {t: {}}；预留字段，参数内容放到t中
    reqHeaders：请求头参数，非必传
    reqConfig: {
        baseUrl: '/insure-api', // baseUrl是接口服务前缀， 必传
        ...others, // 其他参数， 非必传
    }
  -->
  <BcDownlaodList 
    :user-id="111" 
    :req-headers="{ authorization: 'a629a6d88ac14ea28455ca9a9dd08f37' }"
  />
</template>

<script setup>
import { BcDownlaodList } from 'mth-admin-vue3-components';
</script>

```

