import httpInstance from "@/utils/http"

//一级分类
export function getCategoryAPI(id){
  return httpInstance({
    url:'/category',
    params:{
      id
    }
  })
}
//二级分类
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}