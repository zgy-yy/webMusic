<script setup lang="ts">
import useSongStore from '@/stores/songStore'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { formatTime, Lyric } from '@/utils'
import { useCheckPlayMusic, usePlayCircleHook } from '@/hooks/playCircle'
import useStateStore from '@/stores/stateStore'
import SongsList from '@/components/playlist/SongsList.vue'

const songStore = useSongStore()
const { curSong, lyric, songList } = storeToRefs(songStore)
const bgUrl = computed(() => `url('${curSong.value?.al.picUrl}')`)
const stateStore = useStateStore()
const { showNormalPlayer, animationState } = storeToRefs(stateStore)

function close() {
  showNormalPlayer.value = false
}

const showSonglist = ref(false)

function closeList() {
  showSonglist.value = false
}

function openSonglist() {
  showSonglist.value = true
}

const MsgPop = useCheckPlayMusic()

const scrollRef = ref<HTMLUListElement>()
// play fun
const { audio, paused } = usePlayCircleHook()
const lrc = computed(() => {
  return new Lyric(lyric.value.lyric)
})
const curIndex = ref(0)
const transY = ref('')

function lyricUpdate(index: number) {
  curIndex.value = index
}

watch(curIndex, (value) => {
  if (scrollRef.value) {
    let scrollTop: number = 0
    for (let i = 0; i < value; i++) {
      scrollTop += scrollRef.value?.children[i].clientHeight
    }
    transY.value = `translateY(-${scrollTop}px)`
  }
})

const procRef = ref<HTMLSpanElement>()

const musicTime = reactive({
  cur: '',
  total: ''
})

const TouchBar = {
  moving: false,
  offsetTime: 0
}

function updateTime() {
  musicTime.total = formatTime(audio.duration)
  musicTime.cur = formatTime(audio.currentTime)
  if (!TouchBar.moving) {
    TouchBar.offsetTime = audio.currentTime
    if (procRef.value) {
      const percent = (audio.currentTime / audio.duration) * 100
      procRef.value.style.transform = `translateX(${percent - 100}%)`
    }
  }
  lrc.value.update(TouchBar.offsetTime * 1000, lyricUpdate)
}

audio.addEventListener('play', () => {
  paused.value = false
  animationState.value = 'running'
})
audio.addEventListener('timeupdate', () => {
  updateTime()
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
    lrc.value.stop()
    paused.value = true
    animationState.value = 'paused'
  }
}

function preSong() {
  lrc.value.stop()
  songStore.perSong()
}

function nextSong() {
  lrc.value.stop()
  songStore.nextSong()
}

// let touchStart = 0
let BarSize = {
  left: 0,
  right: 0,
  width: 0
}

function onTouchStart(ev: TouchEvent) {
  TouchBar.moving = true
  if (procRef.value) {
    const backBar = procRef.value?.previousSibling as HTMLSpanElement
    const { left, right, width } = backBar.getBoundingClientRect()
    BarSize.left = left
    BarSize.right = right
    BarSize.width = width
  }
}

function onTouchMove(ev: TouchEvent) {
  let touchX = ev.touches[0].pageX

  if (touchX > BarSize.right) {
    touchX = BarSize.right
  } else if (touchX < BarSize.left) {
    touchX = BarSize.left
  }
  let offset = touchX - BarSize.left
  if (procRef.value) {
    const target: HTMLSpanElement = procRef.value

    TouchBar.offsetTime = (offset / BarSize.width) * audio.duration

    target.style.transform = `translateX(${(offset / BarSize.width) * 100 - 100}%)`
  }
}

function onTouchEnd(ev: TouchEvent) {
  TouchBar.moving = false
  audio.currentTime = TouchBar.offsetTime
}
</script>

<template>
  <div class="main">
    <MsgPop></MsgPop>
    <div class="bg-view"></div>
    <div class="play-view" @click="closeList">
      <div class="title">
        <p class="song-name-bar">
          <span @click="close" class="iconfont icon-CZ_004"></span>
          {{ curSong?.name }}
          <span class="iconfont icon-JC_053"></span>
        </p>
        <p class="singer">{{ curSong?.al.name }}</p>
      </div>
      <!--      circle-->
      <div class="circle-wrapper">
        <img :src="curSong?.al.picUrl" alt="" />
      </div>
      <!--lyric-->
      <div class="lyric no-scroll-bar">
        <div class="lyric-wrapper">
          <ul ref="scrollRef">
            <li
              :class="curIndex == index ? 'activeLi' : ''"
              v-for="(item, index) in lrc.getLines()"
              :key="item.time"
            >
              {{ item.txt }}
            </li>
          </ul>
        </div>
      </div>
      <!--      options-->
      <div class="process">
        <span>{{ musicTime.cur }}</span>
        <span class="process-bar">
          <span class="back-bar"></span>
          <span ref="procRef" class="bar-wrapper">
            <span
              @touchstart.prevent="onTouchStart"
              @touchmove.prevent="onTouchMove"
              @touchend.prevent="onTouchEnd"
              class="bar-btn"
            ></span>
          </span>
        </span>
        <span>{{ musicTime.total }}</span>
      </div>
      <div class="options">
        <span class="iconfont icon-suijibofang"></span>
        <span @click="preSong" class="iconfont icon-shangyishouge"></span>
        <span
          @click="playMode"
          :class="paused ? 'icon-bofang' : 'icon-zanting'"
          class="play-icon iconfont"
        ></span>
        <span @click="nextSong" class="iconfont icon-xiayishou"></span>
        <span @click.stop="openSonglist" class="iconfont icon-bofanggedan"></span>
      </div>

      <transition name="list">
        <div v-if="showSonglist" class="song-list">
          <songs-list :songs="songList ?? []"></songs-list>
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
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 1000;
  color: rgba(150, 144, 144, 0.95);

  .song-name-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      padding: 0 1rem;
    }
  }

  p {
    padding: 0.3rem;
  }

  .singer {
    font-size: 0.8rem;
  }
}

.circle-wrapper {
  text-align: center;
  margin-top: 1rem;
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

//lyric
.lyric {
  flex-grow: 1;
  flex-shrink: 1;
  margin-top: 1.8rem;
  margin-bottom: 2rem;
  color: #cccccc;
  text-align: center;
  overflow: hidden;

  .lyric-wrapper {
    height: 100%;
    transform: translateY(50%);
  }

  ul {
    transform: v-bind(transY);
    transition: transform 1s ease-in-out;

    li {
      box-sizing: border-box;
      line-height: 1.4rem;
      padding: 0.3rem;
    }
  }

  .activeLi {
    color: #ffcd32;
  }
}

//
.process {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  .process-bar {
    height: 0.6rem;
    box-sizing: border-box;
    flex-grow: 1;
    margin: 0 2rem;
    position: relative;
    overflow: hidden;

    .back-bar {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      display: inline-block;
      width: 100%;
      height: 0.1rem;
      background: #363434;
    }

    .bar-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      display: inline-block;
      width: calc(100% - 0.5rem);
      height: 0.1rem;
      background: #ffcd32;

      .bar-btn {
        position: absolute;
        right: 0;
        background: #d7b366;
        border-radius: 50%;
        display: inline-block;
        transform: translateY(-50%) translateX(100%);
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}

.options {
  display: flex;
  padding: 1rem 0;
  justify-content: space-around;
  align-items: center;

  span {
    font-size: 1.6rem !important;
    color: rgba(150, 144, 144, 0.95);
  }

  .play-icon {
    font-size: 2.1rem !important;
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
