<template>
  <div class="ChartPage">
    <n-layout>
      <!-- <layout-header-pro>
        <template #left>
          <header-left-btn></header-left-btn>
        </template>
        <template #center>
          <header-title></header-title>
        </template>
        <template #ri-left>
          <header-right-btn></header-right-btn>
        </template>
      </layout-header-pro> -->
      <div>顶部内容</div>
      <n-layout-content content-style="overflow:hidden; display: flex">
        <div style="overflow:hidden; display: flex">
          <content-charts></content-charts>
          <!-- <content-layers></content-layers> -->
        </div>
        <!-- <content-configurations></content-configurations> -->
      </n-layout-content>
    </n-layout>
  </div>
</template>


<script setup lang="ts">
import { loadAsyncComponent } from '@/utils'

const ContentCharts = loadAsyncComponent(() => import('./components/ContentCharts/index.vue'))
// const ContentLayers = loadAsyncComponent(() => import('./ContentLayers/index.vue'))
</script>
