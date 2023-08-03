import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PlayList, RecommendPlaylist } from '@/type/recommentType'
import type { AlbumType } from '@/type/albumType'
import { getHotRecommend } from '@/server/api/recommend'
import { getHotAlbums } from '@/server/api/album'
import { getListDetail } from '@/server/api/list'

const useRecommendStore = defineStore('recommend', () => {
  const hotRecommend = ref<RecommendPlaylist[]>([]) //热门歌单推荐
  const newAlbum = ref<AlbumType[]>([]) //新专辑推荐
  const playListRecom = ref<PlayList[]>([])

  function getHotList() {
    return getHotRecommend().then((list) => {
      // console.log(list);
      if (list) {
        hotRecommend.value = list
      }
    })
  }

  function getNewAlbum() {
    return getHotAlbums().then((res) => {
      if (res) {
        newAlbum.value = res
      }
    })
  }

  function getRecPlaylist() {
    //(19723756) 3779629  2884035
    getListDetail(19723756).then((res) => {
      if (res) {
        playListRecom.value.push(res)
      }
    })
    getListDetail(3779629).then((res) => {
      if (res) {
        playListRecom.value.push(res)
      }
    })
    getListDetail(2884035).then((res) => {
      if (res) {
        playListRecom.value.push(res)
      }
    })
  }

  return {
    hotRecommend,
    newAlbum,
    playListRecom,
    getHotList,
    getNewAlbum,
    getRecPlaylist
  }
})

export default useRecommendStore
