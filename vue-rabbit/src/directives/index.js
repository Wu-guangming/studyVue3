import { useIntersectionObserver } from '@vueuse/core'
//定义懒加载插件
export const lazyPlugin={
  install(app){
    //定义全局指令
    app.directive('img-lazy',{
      mounted(el,binding){
        //el:指令绑定的元素
        //binding:指令等号后面绑定的表达式的值
        
        const {stop}= useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            //console.log(isIntersecting)
            if(isIntersecting){
              //进入视口
              el.src=binding.value
              stop()
            }
          },
        )
      }
    })
  }
}