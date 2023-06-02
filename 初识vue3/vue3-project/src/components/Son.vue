<script setup>
import { inject } from 'vue';

const data = inject('data-key')
const num = inject('num-key')
const add = inject('add-key')
</script>
<template>
  <div>底
    <div>
      来自顶层组件数据---{{ data }}
    </div>
    <div>来自顶层组件响应式数据---{{ num }}</div>
    <div><button @click="add">修改数据{{ num }}</button></div>

  </div>
</template>
<style scoped></style>