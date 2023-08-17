<script setup lang="ts">
import useSongStore from '@/stores/songStore'
import {storeToRefs} from 'pinia'
import {computed, nextTick, ref, watch} from "vue";
import {songCanplay, usePlayCircleHook} from "@/hooks/playCircle";
import {Lyric} from "@/utils";
import CurPlayingPlaylist from "@/components/CurPlayingPlaylist.vue";

const songStore = useSongStore()
const {curSong, lyric} = storeToRefs(songStore)
const emits = defineEmits<{
  (name: "clickMe", props: {
    x: number,
    y: number
  }): void
}>()


const {audio, paused} = usePlayCircleHook()
//
const lrc = computed(() => {
  return new Lyric(lyric.value.lyric)
})
const curLyric = ref('')

//
function lyricUpdate(index: number) {
  curLyric.value = lrc.value.getLines()[index === -1 ? index + 1 : index].txt
}

const process = ref(0)
//
audio.addEventListener('timeupdate', () => {
  lrc.value.update(audio.currentTime * 1000, lyricUpdate)
  let percent = 1 - audio.currentTime / audio.duration
  if (isNaN(percent)) {
    percent = 1
  }
  process.value = percent * 62.8318
})

audio.addEventListener('ended', () => {
  songStore.nextSong()
})

const imgRef = ref<HTMLElement>()

function emitEvent() {
  if (imgRef.value) {
    const rect = imgRef.value.getBoundingClientRect()
    emits('clickMe', {x: rect.x, y: rect.y})
  }

}

function changePlay() {
  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}

const songInfoRef = ref()
const lyricRef = ref()

function checkOverflow(el: HTMLElement) { //检擦文字溢出 则滚动
  if (el.clientWidth < el.scrollWidth) {
    el.classList.add("roll-ani")
  } else {
    el.classList.remove("roll-ani")
  }
}

watch(curSong, (newVal) => {
  if (newVal) {
    songCanplay(newVal).catch(res => {
      songStore.nextSong()
    })
  }

  nextTick(() => {//歌曲信息溢出滚动
    checkOverflow(songInfoRef.value)
  })
}, {immediate: true})

watch(curLyric, () => { //歌词溢出滚动
  nextTick(() => {
    checkOverflow(lyricRef.value)
  })
}, {immediate: true})


const showSonglist = ref(false)
</script>

<template>
  <div class="mini-wrapper" @click="emitEvent">
    <img ref="imgRef" :src="curSong?.al?.picUrl||curSong?.album?.picUrl||curSong?.pic"
         :loading="'/src/assets/icon/none.svg'" alt=""/>
    <div class="info no-wrap">
      <p ref="songInfoRef">
        <span class="song-name">{{ curSong?.name }}</span>
        <span class="singers" v-for="(art,index) in (curSong?.artists||curSong?.ar)" :key="art.name">
          {{ art.name }}<span v-if="index!==(curSong?.artists||curSong?.ar)?.length-1"> / </span>
        </span>
      </p>
      <p ref="lyricRef" class="lyric">
        {{ curLyric }}
      </p>
    </div>
    <div class="option">
      <svg @click.stop="changePlay" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" fill="red">
        <g opacity="1" transform="translate(0 0)  rotate(0)">
          <path id="Rectangle 22" fill-rule="evenodd" style="fill:#F6F6F6" opacity="0"
                d="M0 24L24 24L24 0L0 0L0 24Z"></path>
          <g opacity="1" transform="translate(3 3)  rotate(0)">
            <circle id="Vector" style="fill:#ffffff; opacity:1; transform-origin: 9px 9px; transform: rotate(-90deg) "
                    cx="9"
                    cy="9" r="10" stroke="#d7d7d7" stroke-width="3"></circle>
            <circle id="Vector" style="fill:#ffffff; opacity:1; transform-origin: 9px 9px; transform: rotate(-90deg) "
                    cx="9"
                    cy="9" r="10" stroke="#1574FF"
                    stroke-width="2" stroke-dasharray="62.8318 62.8318" :stroke-dashoffset="process"></circle>
            <path v-if="paused" id="Vector" fill-rule="evenodd" style="fill:#00CEFF" opacity="1"
                  d="M12.22 8.17001L8.37999 5.61001C7.71999 5.19001 6.85999 5.64001 6.85999 6.42001L6.85999 11.54C6.85999 12.32 7.72999 12.77 8.37999 12.35L12.22 9.79001C12.79 9.41001 12.79 8.55001 12.22 8.17001Z"></path>

            <g v-else>
              <rect x="10" y="5" height="8" width="2" fill="#00CEFF"></rect>
              <rect x="6" y="5" height="8" width="2" fill="#00CEFF"></rect>
            </g>
          </g>
        </g>
      </svg>
      <img @click.stop="()=>showSonglist=!showSonglist" src="/src/assets/icon/list.svg" alt="">
      <transition name="surface">
        <div v-if="showSonglist" class="song-list" @click.stop="()=>showSonglist=false">
          <cur-playing-playlist class="lists"/>
        </div>
      </transition>
    </div>

  </div>
</template>

<style lang="less" scoped>
.mini-wrapper {
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  img {
    border-radius: 6px;
    margin: 0 8px 0 16px;
    width: 48px;
    height: 48px;
    flex: 0;
  }

  .info {
    flex: 1;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;


    .song-name {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.24px;
      line-height: 20px;
    }

    .singers {
      margin-left: 8px;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: -0.24px;
      line-height: 14px;
    }

    .lyric {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.24px;
      line-height: 14px;
    }

    .roll-ani {
      animation: goThereAndBack 20s linear infinite;
    }
  }


  .option {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    svg {
      margin-left: 8px;
      width: 32px;
      height: 100%;
    }

    img {
      width: 24px;
      margin: 0 16px;
    }
  }
}

@keyframes goThereAndBack {
  1% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.song-list {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .lists {
    background: white;
    height: 300px;
    margin-top: 100%;
  }
}
</style>
