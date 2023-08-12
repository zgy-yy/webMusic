import {getAudioContext, musicUrl} from '@/utils'
import {h, ref, render} from 'vue'
import type {Song} from '@/type/music'
import TipsView from "@/hooks/TipsView";

export function usePlayCircleHook() {
    const audio = getAudioContext()
    const paused = ref(audio.paused)

    return {
        audio,
        paused,
    }
}

export function songCanplay(song: Song) {
    const audio = getAudioContext()
    audio.src = musicUrl(song.id)

    return new Promise((resolve, reject) => {
        audio.play().then(res => {
            resolve('ok')
        }).catch((err) => {
            console.log('->music play error,没有歌曲连接')
            render(h<{ msg: string }>(TipsView, {msg: '暂无版权'}), document.body)
            setTimeout(() => {
                render(null, document.body)

            }, 1000)
            reject('can not play')
        })
    })
}