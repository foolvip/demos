<template>
  <div>
    example
    <BcDownlaodList user-id="1964" :req-headers="{ authorization: '37673cdde24a4b93a6b3ef9796799346' }"/>
    <!-- <s-button @click="onClick" type="primary">button</s-button>
    <s-input v-model="value">
      <template #prepend>Http://</template>
    </s-input> -->
  </div>
</template>

<script setup>
import { BcDownlaodList } from 'busi-coms-vue3-pnpm';
// import { ref } from 'vue'
// const value = ref('')
// const onClick = () => {
//   console.log('click')
// }
</script>
