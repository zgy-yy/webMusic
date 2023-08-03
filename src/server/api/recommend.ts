import request from '@/server/request'
import type { Banner, RecommendPlaylist } from '@/type/recommentType'

export function getTopBanner() {
  return request
    .get<{ banners: Banner[]; code: number }>({
      url: '/banner'
    })
    .then((res) => {
      if (res.code == 200) {
        return res.banners
      }
    })
}

export function getHotRecommend() {
  return request
    .get<{
      result: RecommendPlaylist[]
      code: number
      category: number
      hasTaste: boolean
    }>({
      url: '/personalized?limit=6'
    })
    .then((res) => {
      if (res.code == 200) {
        return res.result
      } else {
        return null
      }
    })
}


// getTopList(19723756) 3779629  2884035
