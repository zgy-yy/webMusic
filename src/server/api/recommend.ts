import request from '@/server/request'
import type {Banner, RecommendPlaylist} from '@/type/recommentType'
import type {Song} from "@/type/music";

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

export function getRecommendedPlaylists() {
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

export function getNewSongs(id = 0) {
    return request.get<{ code: number, data: Song[] }>({
        url: '/top/song',
        params: {
            type: id
        }
    }).then(res => {
        if (res.code == 200) {
            return res.data.slice(0,10)
        }
    })
}

getNewSongs()
// getTopList(19723756) 3779629  2884035
