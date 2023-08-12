import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Song} from '@/type/music'
import {getLyric} from '@/server/api/song'
import {songCanplay} from "@/hooks/playCircle";

const useSongStore = defineStore('songStore', () => {
    const curSong = ref<Song>()
    const songList = ref<Song[]>([])
    const lyric = ref()

    function setCurSong(song: Song) {
        curSong.value = song
        haveLyric(song.id)
    }

    function nextSong() {
        if (curSong.value && songList.value.length>0) {
            const curIndex = songList.value?.findIndex((item) => {
                return item.id == curSong.value?.id
            })
            const nextSong = songList.value[(curIndex + 1) % songList.value?.length]
            songCanplay(nextSong).then(() => {
                setCurSong(nextSong)
            })
        }
    }

    function perSong() {
        if (curSong.value && songList.value.length>0) {
            const curIndex = songList.value?.findIndex((item) => {
                return item.id == curSong.value?.id
            })
            const preSong = songList.value[(songList.value?.length + curIndex - 1) % songList.value?.length]
            songCanplay(preSong).then(() => {
                setCurSong(preSong)
            })
        }
    }

    function setSonglist(songs: Song[]) {
        songList.value = songs
    }

    function haveLyric(id: number) {
        getLyric(id).then((res) => {
            lyric.value = res
        })
    }

    return {
        curSong,
        lyric,
        songList,
        setCurSong,
        setSonglist,
        nextSong,
        perSong
    }
})

export default useSongStore
