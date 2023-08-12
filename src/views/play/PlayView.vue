<script setup lang="ts">
import useSongStore from '@/stores/songStore'
import {storeToRefs} from 'pinia'
import {computed, reactive, ref, toRefs, watch} from 'vue'
import {usePlayCircleHook} from '@/hooks/playCircle'
import useStateStore from '@/stores/stateStore'
import SongsList from '@/components/playlist/SongsList.vue'
import NavBar from "@/views/play/play-components/NavBar.vue";
import LyricWrapper from "@/views/play/play-components/LyricWrapper.vue";
import ProcessBar from "@/views/play/play-components/ProcessBar.vue";

const songStore = useSongStore()
const {curSong, lyric, songList} = storeToRefs(songStore)

const bgUrl = computed(() => `url('${curSong.value?.al?.picUrl || curSong.value?.album?.picUrl}')`)
const stateStore = useStateStore()
const {animationState} = storeToRefs(stateStore)


const showSonglist = ref(false)
function closeList() {
  showSonglist.value = false
}
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
  nextSong()
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


</script>

<template>
  <div class="main">
    <div class="bg-view"></div>
    <div class="play-view" @click="closeList">
      <nav-bar :song="curSong"/>
      <!--      circle-->
      <div class="circle-wrapper">
        <img :src="curSong?.al?.picUrl||curSong?.album?.picUrl" alt=""/>
      </div>
      <!--lyric-->
      <lyric-wrapper class="lyric"/>
      <process-bar/>
      <!--      options-->

      <div class="options">
        <img src="./assets/icons/loop.svg" alt="">
        <img @click="preSong" src="./assets/icons/previous.svg" alt="">
        <img @click="playMode"
             :src="paused?'/src/views/play/assets/icons/play.svg':'/src/views/play/assets/icons/pause.svg' " alt="">
        <img @click="nextSong" src="./assets/icons/next.svg" alt="">
        <img @click.stop="openSonglist" src="./assets/icons/list.svg" alt="">
      </div>

      <transition name="list">
        <div v-if="showSonglist" class="song-list">
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
.main {
  position: fixed;
  background: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.bg-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: v-bind(bgUrl);
  background-position: center;
  background-size: 260%;
  background-repeat: no-repeat;
  filter: blur(20px);
}

.play-view {
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .lyric {
    flex-grow: 1;
  }

  .circle-wrapper {
    text-align: center;
    margin-top: 24px;
    animation: show-circle ease-in-out 1s 1;

    img {
      animation: playCircle 20s infinite linear;
      animation-play-state: v-bind(animationState);
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      border: 0.5rem solid rgba(248, 242, 242, 0.37);
    }
  }

  .options {
    display: flex;
    margin: 10px auto 30px auto;
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
  height: 20rem;
  overflow: scroll;
}

@keyframes show-circle {
  0% {
    transform: scale(30%);
  }
  100% {
    transform: scale(100%);
  }
}
</style>
