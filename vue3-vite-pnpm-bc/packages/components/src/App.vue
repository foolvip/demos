<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { BcDownlaodList } from './index'
</script>

<template>
  <div>
    <BcDownlaodList user-id="1964" :req-headers="{ authorization: '0edf18cfd62848f7bcb81b7db0a8952c' }" />
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>
