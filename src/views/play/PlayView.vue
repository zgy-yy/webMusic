<script setup lang="ts">
import useSongStore from '@/stores/songStore'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'
import {usePlayCircleHook} from '@/hooks/playCircle'
import useStateStore from '@/stores/stateStore'
import NavBar from "@/views/play/play-components/NavBar.vue";
import LyricWrapper from "@/views/play/play-components/LyricWrapper.vue";
import ProcessBar from "@/views/play/play-components/ProcessBar.vue";
import CurPlayingPlaylist from "@/components/CurPlayingPlaylist.vue";

const props = defineProps<{//mimiplayer img初始位置 用于过渡动画
  x: number,
  y: number,
  showMe: boolean
}>()

const emits = defineEmits<{
  (name: 'closeMe'): void
}>()

function closeMe() {
  emits('closeMe')
}

const songStore = useSongStore()
const {curSong} = storeToRefs(songStore)

const bgUrl = computed(() => `url('${curSong.value?.al?.picUrl || curSong.value?.album?.picUrl || curSong.value?.pic}')`)
const stateStore = useStateStore()
const {animationState} = storeToRefs(stateStore)

const showSonglist = ref(false)

function openSonglist() {
  showSonglist.value = true
}

// play fun
const {audio, paused} = usePlayCircleHook()


// const
function playMode() {
  if (audio.paused) {
    paused.value = false
    animationState.value = 'running'
    audio.play()
  } else {
    audio.pause()
    paused.value = true
    animationState.value = 'paused'
  }
}

function preSong() {
  songStore.perSong()
}

function nextSong() {
  songStore.nextSong()
}

const aniStart = ref('translate(0,0) scale(1,1) ')

const circleImgRef = ref<HTMLElement>()

function onEnter(el: Element, done: () => void) {
  if (circleImgRef.value) {
    const rect = circleImgRef.value.getBoundingClientRect()
    const ratio = 48 / rect.width
    aniStart.value = `translate(${props.x - rect.x - rect.width * (1 - ratio) / 2}px,${props.y - rect.top - rect.height * (1 - ratio) / 2}px) scale(0.2) `
  }
  setTimeout(() => {
    done()
  }, 600)
}


</script>

<template>
  <transition name="page" @enter="onEnter">
    <div class="main" v-if="showMe">
      <div class="bg-view"></div>
      <div class="play-view">
        <nav-bar @close="closeMe" v-if="curSong" :song="curSong"/>
        <!--      circle-->
        <div class="circle-wrapper">
          <img ref="circleImgRef" class="circle-img"
               :src="curSong?.al?.picUrl||curSong?.album?.picUrl|| curSong?.pic"
               alt=""/>
        </div>
        <!--lyric-->
        <lyric-wrapper class="ly"/>
        <process-bar/>
        <!--      options-->

        <div class="options">
          <img src="./assets/icons/loop.svg" alt="">
          <img @click="preSong" src="./assets/icons/previous.svg" alt="">
          <img @click="playMode"
               :src="paused?'/src/views/play/assets/icons/play.svg':'/src/views/play/assets/icons/pause.svg' "
               alt="">
          <img @click="nextSong" src="./assets/icons/next.svg" alt="">
          <img @click.stop="openSonglist" src="./assets/icons/list.svg" alt="">
        </div>

        <transition name="surface">
          <div v-if="showSonglist" class="song-list" @click="()=>showSonglist=false">
            <cur-playing-playlist class="lists"/>
          </div>
        </transition>
      </div>
    </div>
  </transition>

</template>
<style scoped lang="less">

.page-enter-active {
  transition: opacity 0.6s ease;

  .circle-img {
    animation: show-circle 0.6s !important;
  }
}

.page-leave-active {
  transition: opacity 0.6s ease;

  .circle-img {
    animation: show-circle 0.6s reverse !important;
  }
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}


.main {
  background: #ffffff;
  height: 100%;
  z-index: 99;
}

.bg-view {
  z-index: -1;
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: v-bind(bgUrl);
  background-position: center;
  background-size: 200%;
  background-repeat: no-repeat;
  filter: blur(20px);
}

.play-view {
  height: 100%;
  background: rgba(243, 237, 237, 0.11);
  display: flex;
  flex-direction: column;

  .circle-wrapper {
    width: 100vw;
    text-align: center;
    margin: 16px auto;
    flex-shrink: 0;
    height: 69vw;

    .circle-img {
      animation: playCircle 20s infinite linear;
      animation-play-state: v-bind(animationState);
      width: 64vw;
      height: 64vw;
      border-radius: 50%;

      border: 3vw solid rgba(248, 242, 242, 0.37);
    }

  }

  .ly {
    flex: 1;
  }

  .options {
    flex-shrink: 0;
    display: flex;
    margin: 5px auto 20px auto;
    width: 296px;
    height: 56px;
    justify-content: space-around;
    align-items: center;
  }

}


.song-list {
  position: absolute;
  bottom: 0;
  width: 100%;

  .lists {
    margin-top: 100%;
    padding: 0 32px;
    height: 20rem;
    background: white;
  }
}


@keyframes show-circle {
  0% {
    border-radius: 0;
    transform: v-bind(aniStart)
  }
  100% {
  }
}


</style>
