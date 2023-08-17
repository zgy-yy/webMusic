<script setup lang="ts">
import {computed, nextTick, reactive, ref, watch} from "vue";
import {usePlayCircleHook} from "@/hooks/playCircle";
import {Lyric} from "@/utils";
import {storeToRefs} from "pinia";
import useSongStore from "@/stores/songStore";


const scrollRef = ref<HTMLUListElement>()
// play fun
const {audio, paused} = usePlayCircleHook()
const songStore = useSongStore()
const {lyric} = storeToRefs(songStore)
//
const lrc = computed(() => {
  return new Lyric(lyric.value.lyric)
})
const curIndex = ref(0)
const transY = ref('')
const lyRef = ref<HTMLElement>()

const backTransY = ref('0px')
const lineHeight = ref('26px')//每行歌词的高度

nextTick(() => {
  if (lyRef.value) {
    const height = lyRef.value.getBoundingClientRect().height
    const lineNum = Math.floor(height / 26)
    const line_height = height / lineNum
    backTransY.value = `translateY(${Math.floor(lineNum / 2) * line_height + 'px'})`

    lineHeight.value = line_height + 'px'
  }

})

//

watch(paused, () => {
  lrc.value.stop()
}, {immediate: true})

function lyricUpdate(index: number) {
  curIndex.value = index
}

//
watch(curIndex, (value) => {
  if (scrollRef.value) {
    let scrollTop: number = 0
    for (let i = 0; i < value; i++) {
      scrollTop += scrollRef.value?.children[i].clientHeight
    }
    transY.value = `translateY(-${scrollTop}px)`
  }
})
audio.addEventListener('timeupdate', () => {
  lrc.value.update(audio.currentTime * 1000, lyricUpdate)
})
</script>

<template>
  <div class="lyric no-scroll-bar" ref="lyRef">
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
</template>

<style scoped lang="less">
//lyric
.lyric {
  color: #5e5e5e;
  text-align: center;
  overflow: hidden;

  .lyric-wrapper {
    height: 100%;
    transform: v-bind(backTransY);
  }

  ul {
    transform: v-bind(transY);
    transition: transform 1s ease-in-out;

    li {

      font-size: 14px;
      vertical-align: middle;
      height: v-bind(lineHeight);
      line-height: v-bind(lineHeight);

      box-sizing: border-box;
      margin: 0 auto;

    }
  }

  .activeLi {
    color: #1574ff;
    //transform: scale(1.1);
  }
}
</style>