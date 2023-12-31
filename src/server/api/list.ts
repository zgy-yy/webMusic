import request from '@/server/request'
import type {PlayList} from "@/type/recommentType";

/*
* 歌单能看到歌单名字 , 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 
可以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的，
可拿全部 trackIds 请求一次 song/detail*/
export function getListDetail(id: number) {
    return request
        .get<{ playlist: PlayList; code: number }>({
            url: '/playlist/detail',
            params: {
                id
            }
        })
        .then((res) => {
            if (res.code == 200) {
                return res.playlist
            }
        })
}

export function getPlaylistCat() {
    return request.get({
        url: '/playlist/highquality/tags'
    }).then(res => {
        return res.tags
    })
}

export function getQplaylist(cat: string) {
    return request.get({
        url: '/top/playlist/highquality',
        params: {
            cat: cat
        }
    }).then(res => {
        return res
    })
}