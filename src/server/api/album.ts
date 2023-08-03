import request from '@/server/request'
import type { AlbumDetail, AlbumType } from '@/type/albumType'
import type { Song } from '@/type/music'
// 网易云音乐图片 ?imageView&blur=40x20 高斯模糊
//              ?param=100x100 图片尺寸
export function getHotAlbums() {
  return request
    .get<{ albums: AlbumType[]; code: number }>({
      url: '/album/newest'
    })
    .then((res) => {
      if (res.code == 200) {
        return res.albums
      }
    })
}

export function getAlbumDetail(id: number) {
  return request
    .get<AlbumDetail>({
      url: '/album',
      params: { id }
    })
    .then((res) => {
      if (res.code == 200) {
        return res
      }
    })
}
