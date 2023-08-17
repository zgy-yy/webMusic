import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PlayList } from '@/type/recommentType'
import { getListDetail } from '@/server/api/list'
import { getAlbumDetail } from '@/server/api/album'
import type { AlbumDetail } from '@/type/albumType'
import type { SingerDetail } from '@/type/singer'
import { getSingerDetail } from '@/server/api/singer'

const useListStore = defineStore('list', () => {
  const playlistDetail = ref<PlayList>() //歌单详情
  const albumDetail = ref<AlbumDetail>()//专辑详情
  const singerDetail = ref<SingerDetail>()//歌手详情

  function getPlaylistDetail(id: number) {
    return getListDetail(id).then((res) => {
      if (res) {
        playlistDetail.value = res
      }
    })
  }

  function getDetailAlbum(id: number) {
    return getAlbumDetail(id).then((res) => {
      if (res) {
        albumDetail.value = res
      }
    })
  }

  function getDeatilSinger(id: number) {
    return getSingerDetail(id).then((res) => {
      singerDetail.value = res
    })
  }

  return {
    playlistDetail,
    albumDetail,
    singerDetail,
    getPlaylistDetail,
    getDetailAlbum,
    getDeatilSinger
  }
})

export default useListStore
