<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView></RouterView>
  <div class="test">testscss</div>
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>