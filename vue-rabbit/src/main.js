import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入初始化样式文件
import '@/styles/common.scss'

/* //测试接口函数
import{getCategoryAPI} from "@/apis/testAPI"
getCategoryAPI().then(res=>{
  console.log(res)
}) */
//引入懒加载插件并注册
import { lazyPlugin } from './directives'
const app = createApp(App)
// 引入全局组件插件
import { componentPlugin } from '@/components'

app.use(componentPlugin)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
