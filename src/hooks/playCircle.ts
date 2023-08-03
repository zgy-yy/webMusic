import { getAudioContext, musicUrl } from '@/utils'
import { h, ref, render, Transition, watch } from 'vue'
import { checkMusic } from '@/server/api/song'
import type { Song } from '@/type/music'
import useSongStore from '@/stores/songStore'
import { storeToRefs } from 'pinia'

export function usePlayCircleHook() {
  const audio = getAudioContext()
  const paused = ref(audio.paused)

  return {
    audio,
    paused,
  }
}

export function useCheckPlayMusic() {
  const songStore = useSongStore()
  const { curSong } = storeToRefs(songStore)
  const checkFail = ref(false)
  const popMsg = (value: boolean) => {
    checkFail.value = value
    setTimeout(() => {
      checkFail.value = false
    }, 1500)
  }

  watch(curSong, (newVal) => {
    if (newVal) {
      checkMusicUrl(newVal)
    }
  })

  function checkMusicUrl(song: Song) {
    checkMusic(song.id).then((res) => {
      popMsg(!res)
      if (res) {
        const audio = getAudioContext()
        audio.src = musicUrl(song.id)
        audio.play().catch((err) => {
          console.log('->music play error,没有歌曲连接')
          popMsg(true)
        })
      }
    })
  }

  return () =>
    h(Transition, { name: 'fade' }, () => [
      checkFail.value ? h('div', { className: 'pop-msg' }, 'error') : null
    ])
}
