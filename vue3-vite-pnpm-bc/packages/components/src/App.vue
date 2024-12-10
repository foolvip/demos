<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { BcDownlaodList } from './index'
</script>

<template>
  <div>
    <BcDownlaodList user-id="1964" :req-headers="{ authorization: '9c182ab7af4b4999b8adbcf86d209aa6' }" />
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>
