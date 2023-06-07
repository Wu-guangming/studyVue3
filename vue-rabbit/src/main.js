import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  PiniaPluginPersistedState  from 'pinia-plugin-persistedstate'
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

// 引入全局组件插件
import { componentPlugin } from '@/components'
const app = createApp(App)
const pinia=createPinia()
pinia.use(PiniaPluginPersistedState)
app.use(componentPlugin)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
