<script setup>
//导入use打头方法
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useCounterStore } from './stores/counter';
//执行方法得到实例对象
//storeToRefs解构赋值,保持响应式只处理数据,不包括方法
const useCounter = useCounterStore()
const { count, doubleCount } = storeToRefs(useCounter)
onMounted(() => {
  useCounter.getList()
})
</script>

<template>
  <button @click="useCounter.add">{{ count }}</button>
  {{ doubleCount }}
  <ul>
    <li v-for="item in useCounter.list" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<style scoped></style>
