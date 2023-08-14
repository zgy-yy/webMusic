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
import {useRoute} from "vue-router";

const songStore = useSongStore()
const {curSong} = storeToRefs(songStore)

const bgUrl = computed(() => `url('${curSong.value?.al?.picUrl || curSong.value?.album?.picUrl}')`)
const stateStore = useStateStore()
const {animationState, showNormalPlayer} = storeToRefs(stateStore)

const showSonglist = ref(false)

function openSonglist() {
  showSonglist.value = true
}

// play fun
const {audio, paused} = usePlayCircleHook()

audio.addEventListener('play', () => {
  paused.value = false
  animationState.value = 'running'
})
audio.addEventListener('ended', () => {
  animationState.value = 'paused'
  paused.value = true
})
audio.addEventListener('error',()=>{
  animationState.value = 'paused'
  paused.value = true
})

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

const transStart = ref('translate(0,0)')

const route = useRoute()
console.log(route)

function onenter(el: HTMLElement, done: () => void) {
  const rect = el.getBoundingClientRect()
  transStart.value = `translate(calc(48px - 8px - 50vw),calc(${rect.bottom + rect.height - 48 - 16}px))`
  el.classList.add('show-img')
  setTimeout(() => {
    done()
  }, 1000)
}

function onafterEnter(el: HTMLElement) {
  el.classList.remove('show-img')
}

</script>

<template>
  <transition appear name="page">
    <div v-if="showNormalPlayer" class="main">
      <div class="bg-view"></div>
      <div class="play-view">
        <nav-bar :song="curSong"/>
        <!--      circle-->
        <div class="circle-wrapper">
          <transition appear
                      @enter="onenter"
                      @afterEnter="onafterEnter"
          >
            <img v-if="showNormalPlayer" class="circle-img" :src="curSong?.al?.picUrl||curSong?.album?.picUrl"
                 alt=""/>
          </transition>
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

.page-enter-active,
.page-leave-active {
  transition: all 0.6s linear;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-leave-active {
  .circle-img {
    transition: all 0.6s linear;
    animation: none !important;
  }

}

.page-leave-to {

  .circle-img {
    width: 48px !important;
    height: 48px !important;
    border-radius: 0 !important;
    transform: v-bind(transStart)
  }

}

.main {
  background: #ffffff;
  height: 100%;
}

.bg-view {
  z-index: -1;
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: v-bind(bgUrl);
  background-position: center;
  background-size: 260%;
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
      width: 69vw;
      height: 69vw;
      border-radius: 50%;
      border: 0.5rem solid rgba(248, 242, 242, 0.37);
    }

    .show-img {
      animation: show-circle 1s 1 linear;
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
  .lists{
    margin-top: 100%;
    padding: 0 32px;
    height: 20rem;
    overflow: scroll;
    background: white;
  }
}


@keyframes show-circle {
  0% {
    width: 48px;
    height: 48px;
    border-radius: 0;
    transform: v-bind(transStart)
  }
  30% {
    border-radius: 50%;

  }
  100% {
  }
}


</style>
