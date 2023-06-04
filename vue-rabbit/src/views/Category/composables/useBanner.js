import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue';
//获取banner
export function useBanner () {
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    //console.log(res)
    bannerList.value = res.result
  }
  
  onMounted(() => getBanner())
  return {
    bannerList
  }
}
