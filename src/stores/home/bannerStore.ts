import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Banner } from '@/type/recommentType'

import { getTopBanner } from '@/server/api/recommend'

const useBanner = defineStore('banner', () => {
  const banners = ref<Banner[]>([])
  const getBanner = function () {
    getTopBanner().then((res) => {
      if (res) {
        banners.value = res
        banners.value?.push(banners.value[0])
      }
    })
  }
  return { banners, getBanner }
})
export default useBanner
