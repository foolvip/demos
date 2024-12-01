<template>
  <div class="greetings">
    <Map />
  </div>
</template>
<script setup lang="ts">
import Map from '@/components/echarts/Map/index.vue'
defineProps<{
  msg: string
}>()
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
