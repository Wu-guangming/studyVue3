<script setup>
import { provide, ref } from 'vue';
import SonSon from './components/SonSon.vue';
provide('data-key', '顶层数据')
const num = ref(0)
provide('num-key', num)
setTimeout(() => {
  num.value = 200
}, 2000)
const add = () => {
  num.value++
}
provide('add-key', add)
</script>
<template>
  <div class="father">顶
    <SonSon></SonSon>
  </div>
</template>
<style scoped></style>