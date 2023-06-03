import { defineStore } from "pinia";
import { computed, ref } from "vue";
import  axios  from "axios"
const url="http://geek.itheima.net/v1_0/channels"
//导入一个方法defineStore
export const useCounterStore= defineStore('counter',()=>{
  //定义数据state
  const count=ref(0)

  //定义修改数据方法action
  const add=()=>{
    count.value++
  }
  //getter
  const doubleCount=computed(()=>count.value*2)
  //action
  const list=ref([])
  const getList=async ()=>{
    const res= await axios.get(url)
    list.value=res.data.data.channels
    console.log(res)
  }
  //return返回
  return{
    count,
    add,
    doubleCount,
    list,
    getList
  }
})