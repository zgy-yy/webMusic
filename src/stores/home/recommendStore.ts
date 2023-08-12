import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {PlayList, RecommendPlaylist} from '@/type/recommentType'
import type {AlbumType} from '@/type/albumType'
import {getNewSongs, getRecommendedPlaylists} from '@/server/api/recommend'
import {getHotAlbums} from '@/server/api/album'
import {getListDetail} from '@/server/api/list'
import type {Song} from "@/type/music";

const useRecommendStore = defineStore('recommend', () => {
    const hotRecommend = ref<RecommendPlaylist[]>([]) //热门歌单推荐
    const newAlbum = ref<AlbumType[]>([]) //新专辑推荐
    const playListRecommend = ref<PlayList[]>([])
    const newSongs = ref<Song[]>([])

    function haveRecommendedPlaylists() {
        return getRecommendedPlaylists().then((list) => {
            if (list) {
                hotRecommend.value = list
            }
        })
    }

    function haveNewAlbum() {
        return getHotAlbums().then((res) => {
            if (res) {
                newAlbum.value = res
            }
        })
    }

    function haveNewSongs() {
        return getNewSongs().then(res => {
            if (res) {
                newSongs.value = res
            }
        })
    }

    function haveRecPlaylist() {
        //(19723756) 3779629  2884035
        getListDetail(19723756).then((res) => {
            if (res) {
                playListRecommend.value.push(res)
            }
        })
        getListDetail(3779629).then((res) => {
            if (res) {
                playListRecommend.value.push(res)
            }
        })
        getListDetail(2884035).then((res) => {
            if (res) {
                playListRecommend.value.push(res)
            }
        })
    }

    return {
        hotRecommend,
        newAlbum,
        playListRecommend,
        newSongs,
        haveRecommendedPlaylists,
        haveNewAlbum,
        haveRecPlaylist,
        haveNewSongs
    }
})

export default useRecommendStore
