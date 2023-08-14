<script setup lang="ts">
import {reactive, ref} from "vue";
import {usePlayCircleHook} from "@/hooks/playCircle";
import {formatTime} from "@/utils";

const {audio} = usePlayCircleHook()

const procRef = ref<HTMLSpanElement>()

const playTime = reactive({
  cur: '00:00',
  total: '00:00'
})

const tranX = ref('translateX(-100%)')
audio.addEventListener('timeupdate', () => {

  playTime.total = formatTime(audio.duration)
  playTime.cur = formatTime(audio.currentTime)

  let percent = (audio.currentTime / audio.duration) * 100
  if (isNaN(percent)) {
    tranX.value = 'translateX(-100%)'
  } else {
    tranX.value = `translateX(${percent - 100}%)`
  }
})
const TouchBar = {
  offsetTime: 0
}


let barSize = {
  left: 0,
  right: 0,
  width: 0
}

function onTouchStart(ev: TouchEvent) {
  if (procRef.value) {
    const processBar = procRef.value?.parentElement
    if (processBar) {
      const {left, right, width} = processBar.getBoundingClientRect()
      barSize.left = left
      barSize.right = right
      barSize.width = width
    }
  }
}

function onTouchMove(ev: TouchEvent) {
  console.log(barSize)
  let touchX = ev.touches[0].pageX

  if (touchX > barSize.right) {
    touchX = barSize.right
  } else if (touchX < barSize.left) {
    touchX = barSize.left
  }
  let offset = touchX - barSize.left
  if (procRef.value) {
    const target: HTMLSpanElement = procRef.value

    TouchBar.offsetTime = (offset / barSize.width) * audio.duration

    target.style.transform = `translateX(${(offset / barSize.width) * 100 - 100}%)`
  }
}

function onTouchEnd(ev: TouchEvent) {
  audio.currentTime = TouchBar.offsetTime
  if (procRef.value) {
    const target: HTMLSpanElement = procRef.value
    target.style.removeProperty('transform')
  }
}
</script>

<template>
  <div class="process">
    <p class="process-bar">
      <span ref="procRef" class="bar-wrapper">
            <span
                @touchstart.prevent="onTouchStart"
                @touchmove.prevent="onTouchMove"
                @touchend.prevent="onTouchEnd"
                class="bar-btn"
            ></span>
          </span>
    </p>
    <p class="timer">
      <span>{{ playTime.cur }}</span>
      <span>{{ playTime.total }}</span>
    </p>
  </div>
</template>

<style scoped lang="less">

.process {
  width: 295px;
  height: 38px;
  flex-shrink: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding-top: 8px;

  .process-bar {
    height: 6px;
    background: rgba(234, 237, 242, 1);

    .bar-wrapper {
      position: relative;
      display: inline-block;
      width: calc(100% - 20px);
      vertical-align: top;

      height: 100%;
      background: rgba(21, 116, 255, 1);
      transform: v-bind(tranX);

      .bar-btn {
        vertical-align: middle;
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border: 5px solid rgba(21, 116, 255, 1);
        border-radius: 50%;
        background: rgb(232, 235, 239);
        transform: translate(100%, calc(-50% + 3px));
      }
    }
  }

  .timer {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.24px;
    line-height: 18px;
    color: rgba(156, 156, 156, 1);
    display: flex;
    justify-content: space-between;
  }
}

</style>