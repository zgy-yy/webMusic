<script setup lang="ts">
import useSongStore from '@/stores/songStore'
import { storeToRefs } from 'pinia'
import { usePlayCircleHook } from '@/hooks/playCircle'
import PlayView from '@/views/PlayView.vue'
import useStateStore from '@/stores/stateStore'

const songStore = useSongStore()
const { curSong } = storeToRefs(songStore)
const stateStore = useStateStore()
const { showNormalPlayer, animationState } = storeToRefs(stateStore)

function showPlayer() {
  showNormalPlayer.value = true
}
</script>

<template>
  <div class="circle-wrapper" @click="showPlayer">
    <img class="content" :src="curSong?.al.picUrl" alt="" />
  </div>
</template>

<style lang="less" scoped>
.circle-wrapper {
  z-index: 999;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  transform: translateY(-0.5rem);
  text-align: center;
  width: 3.6rem;

  .content {
    background: white;
    width: 100%;
    border-radius: 50%;
    animation: playCircle 20s infinite linear;
    animation-play-state: v-bind(animationState);
  }
}
</style>
