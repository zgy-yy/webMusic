import request from '@/server/request'
import type {Singer} from '@/type/singer'
import type {Song} from '@/type/music'


//热门歌手
export function getSingerHot(offset = 0, limit = 30) {
    return request
        .get<{ code: number; artists: Singer[] }>({
            url: '/top/artists',
            params: {
                offset,
                limit
            }
        }).then(res => {
            return res.artists
        })

}

// 歌手 类别
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
        .get<{
            code: number; artist: Singer; hotSongs: Array<any>
        }>({
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
