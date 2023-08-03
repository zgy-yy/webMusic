import request from '@/server/request'
import type { Singer } from '@/type/singer'
import type { Song } from '@/type/music'

export function getSinger(id: number) {
  return request
    .get<{ code: number; artists: Singer[] }>({
      url: '/artist/list',
      params: {
        cat: id
      }
    })
    .then((res) => {
      return res.artists
    })
}

export function getSingerDetail(id: number) {
  return request
    .get<{ code: number; artist: Singer; hotSongs: Song[] }>({
      url: '/artists',
      params: {
        id: id
      }
    })
    .then((res) => {
      console.log(res)
      return res
    })
}
