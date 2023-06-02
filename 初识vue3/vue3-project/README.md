# vue3初体验

创建vue3项目

```
npm init vue@latest
```

之后在vscode打开终端下载依赖,打开项目

```sh
npm install
```

```sh
npm run dev
```

# 熟悉项目目录和关键文件

vite.config.js--项目的配置文件,基于vite的配置

package.json--项目包文件,核心依赖变为vue3.x和vite

main.js--入口文件,createApp创建实例对象

app.vue--script-template-style

1. script和template顺序调整
2. template不在要求唯一根元素
3. script中添加setup标识支持组合式api

index.html--单页入口,提供id为app的挂载节点

# setup

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230601163856453.png" alt="image-20230601163856453" style="zoom: 67%;" />

原始写法

```
<script>
export default{
  setup() {
    console.log("setup")
    const message = 'this is message'
    const Message = () => {
      console.log(message)
    }
    return {
      message,
      Message
    }
  },
  beforeCreate() {
    console.log("beforeCreate")
  }
}
</script>
<template>
  <div>
    {{ message }}
    <button @click="Message">log</button>
  </div>
</template>
```

setup语法糖

```
<script setup>
const message = 'this is message'
const Message = () => {
  console.log(message)
}

</script>
<template>
  <div>
    {{ message }}
    <button @click="Message">log</button>
  </div>
</template>
```

# reactive和ref

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230601165438351.png" alt="image-20230601165438351" style="zoom:67%;" />

reactive():接收对象类型数据的参数传入并返回一个响应式对象

```
<script setup>
//导入reactive函数
import { reactive } from 'vue';
const state = reactive({
  count: 0
})
const add = () => {
  state.count++
}
</script>
<template>
  <div>

    <button @click="add">{{ state.count }}</button>
  </div>
</template>
```

ref():接收简单类型或对象类型数据传入并返回一个响应式对象

```
<script setup>
//导入ref函数
import { ref } from 'vue';
const state = ref(0)
const add = () => {
  //修改ref产生的响应式对象的值必须通过.value属性
  state.value++
}
</script>
<template>
  <div>

    <button @click="add">{{ state }}</button>
  </div>
</template>
```

# computed

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602101542656.png" alt="image-20230602101542656" style="zoom:67%;" />

```
<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
const computedList = computed(() => {
  return list.value.filter(item => item > 2)
})
setTimeout(() => {
  list.value.push(10, 11)
}, 3000)
</script>
<template>
  <div>
    list:{{ list }}
  </div>
  <div>
    computedList:{{ computedList }}
  </div>
</template>
```

# watch

侦听一个或多个数据的变化,当数据变化时执行相应的回调函数

两参数:immediate(立即执行),deep(深度侦听)

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602105925561.png" alt="image-20230602105925561" style="zoom:67%;" />

侦听单个数据

```
<script setup>
//导入ref函数
import { ref, watch } from 'vue';
const count = ref(0)
const add = (() => {
  count.value++
})
watch(count, (newValue, oldValue) => {
  console.log("count变化了", newValue, oldValue)
})
</script>
<template>
  <div>
    <button @click="add">{{ count }}</button>
  </div>
</template>
```

侦听多个数据,不管哪个数据变化,都需要执行回调

```
<script setup>
//导入ref函数
import { ref, watch } from 'vue';
const count = ref(0)
const add = (() => {
  count.value++
})
const str = ref('pc')
const update = (() => {
  str.value = 'cp'
})
watch([count, str], ([newCount, newStr], [oldCount, oldStr]) => {
  console.log("变化了", [newCount, newStr], [oldCount, oldStr])
})
</script>
<template>
  <div>
    <button @click="add">count:{{ count }}</button>
    <br>
    <button @click="update">str:{{ str }}</button>
  </div>
</template>
```

immediate(立即执行):在侦听器创建时立即触发回调,在数据变化时继续触发回调

```
<script setup>
//导入ref函数
import { ref, watch } from 'vue';
const count = ref(0)
const add = (() => {
  count.value++
})
const str = ref('pc')
const update = (() => {
  str.value = 'cp'
})
watch([count, str], ([newCount, newStr], [oldCount, oldStr]) => {
  console.log("变化了", [newCount, newStr], [oldCount, oldStr])
}, { immediate: true })
</script>
<template>
  <div>
    <button @click="add">count:{{ count }}</button>
    <br>
    <button @click="update">str:{{ str }}</button>
  </div>
</template>
```

deep(深度侦听):监听ref对象默认浅层监听,直接修改嵌套的对象属性不会触发回调,需要开启deep

```
<script setup>
//导入ref函数
import { ref, watch } from 'vue';
const num = ref({ count: 0 })
const add = (() => {
  num.value.count++
})
watch(num, () => {
  console.log("count变化了")
}, { deep: true })
</script>
<template>
  <div>
    <button @click="add">{{ num.count }}</button>
  </div>
</template>
```

在有多个属性,想要侦听某个特定属性变化

```
<script setup>
//导入ref函数
import { ref, watch } from 'vue';
const obj = ref({ count: 0, name: 'pc' })
const add = (() => {
  obj.value.count++
})

const update = (() => {
  obj.value.name = 'cp'
})
watch(() => obj.value.count, () => {
  console.log("变化了")
})
</script>
<template>
  <div>
    <button @click="add">count:{{ obj.count }}</button>
    <br>
    <button @click="update">str:{{ obj.name }}</button>
  </div>
</template>
```

# 生命周期

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602135129005.png" alt="image-20230602135129005" style="zoom:67%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602135454721.png" alt="image-20230602135454721" style="zoom:67%;" />

# 父子通信

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602142447109.png" alt="image-20230602142447109" style="zoom:67%;" />

父传子

father

```
<script setup>
import Son from './components/son.vue';
import { ref } from 'vue';
const num = ref(0)
</script>
<template>
  <div class="father">
    <son :num="num" message="father message"></son>
  </div>
</template>
```

son

```
<script setup>
defineProps({
  message: String,
  num: Number
})

</script>
<template>
  <div class="son">
    <div>父传子数据:{{ message }}</div>
    <button>{{ num }}</button>
  </div>
</template>
```

子传父

father

```
<script setup>
import Son from './components/son.vue';
const getMessage = (msg) => {
  console.log(msg)
}
</script>
<template>
  <div class="father">
    <son @get-message="getMessage"></son>
  </div>
</template>
```

son

```html
<script setup>
const emit = defineEmits(['get-message'])
const sendMsg = () => {
  emit('get-message', 'son to father')
}
</script>
<template>
  <div class="son">
    <button @click="sendMsg">点击</button>
  </div>
</template>
```

# 模板引用

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602144145068.png" alt="image-20230602144145068" style="zoom:67%;" />

```html
<script setup>
import Son from './components/son.vue';
import { onMounted, ref } from 'vue';
const domRef = ref(null)
const sonRef = ref(null)
onMounted(() => {
  console.log(domRef.value)
  console.log(sonRef.value)
})
</script>
<template>
  <div class="father">
    <h1 ref="domRef">dom标签</h1>
    <son ref="sonRef"></son>
  </div>
</template>
```

```html
<script setup>
import { ref } from 'vue';
const num = ref(0)
const add = () => {
  num.value++
}
</script>
<template>
  <div>
    <button @click="add">add:{{ num }}</button>
  </div>
</template>
```

# provide和inject

跨层组件通信,顶层组件向任意组件传递数据和方法

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602144621476.png" alt="image-20230602144621476" style="zoom:67%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602150400169.png" alt="image-20230602150400169" style="zoom:67%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230602151545958.png" alt="image-20230602151545958" style="zoom:67%;" />

```
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
```

```
<script setup>
import son from './son.vue';
</script>
<template>
  <div>中
    <son></son>
  </div>
</template>
<style scoped></style>
```

```
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
```

