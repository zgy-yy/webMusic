import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Song } from '@/type/music'
import { getLyric } from '@/server/api/song'

const useSongStore = defineStore('songStore', () => {
  const curSong = ref<Song>()
  const songList = ref<Song[]>([])
  const lyric = ref()

  function setCurSong(song: Song) {
    curSong.value = song
    haveLyric(song.id)
  }

  function nextSong() {
    if (curSong.value && songList.value) {
      const curIndex = songList.value?.findIndex((item) => {
        return item.id == curSong.value?.id
      })
      setCurSong(songList.value[(curIndex + 1) % songList.value?.length])
    }
  }

  function perSong() {
    if (curSong.value && songList.value) {
      const curIndex = songList.value?.findIndex((item) => {
        return item.id == curSong.value?.id
      })
      setCurSong(songList.value[(songList.value?.length + curIndex - 1) % songList.value?.length])
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
