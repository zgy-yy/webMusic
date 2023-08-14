import request from '@/server/request'
import type { Lyric } from '@/type/music'

export function checkMusic(id: number) {
  return request
    .get<{ message: string; success: boolean }>({
      url: '/check/music',
      params: {
        id: id
      }
    })
    .then((res) => {
      return res.success
    })
}

export function getLyric(id: number) {
  return request
    .get<Lyric>({
      url: '/lyric',
      params: {
        id: id
      }
    })
    .then((res) => {

      return res.lrc
    })
}
