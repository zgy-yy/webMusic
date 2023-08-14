<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {usePlayCircleHook} from "@/hooks/playCircle";
import {Lyric} from "@/utils";
import {storeToRefs} from "pinia";
import useSongStore from "@/stores/songStore";


const scrollRef = ref<HTMLUListElement>()
// play fun
const {audio} = usePlayCircleHook()
const songStore = useSongStore()
const {lyric} = storeToRefs(songStore)
//
const lrc = computed(() => {
  return new Lyric(lyric.value.lyric)
})
const curIndex = ref(0)
const transY = ref('')

//
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
</template>

<style scoped lang="less">
//lyric
.lyric {
  color: #5e5e5e;
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
      width: 90%;
      margin: 0 auto;
    }
  }

  .activeLi {
    color: #1574ff;
    transform: scale(1.2);
  }
}
</style>