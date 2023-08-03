<script setup lang="ts">
import type { Song } from '@/type/music'
import useSongStore from '@/stores/songStore'

import { useCheckPlayMusic } from '@/hooks/playCircle'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const props = defineProps<{ songs: Song[] }>()
const songStore = useSongStore()
const { curSong, songList } = storeToRefs(songStore)
let MsgVNode = useCheckPlayMusic()

const curIndex = ref(-1)
watch(
  curSong,
  () => {
    curIndex.value = props.songs.findIndex((item) => {
      return item.id == curSong.value?.id
    })
  },
  { immediate: true }
)

function setPlay(song: Song) {
  songStore.setCurSong(song)
  songStore.setSonglist(props.songs)
  // console.log(MsgVNode)
}
</script>

<template>
  <div class="main-list">
    <MsgVNode></MsgVNode>
    <ul>
      <li
        @click="setPlay(item)"
        :class="curIndex == index ? 'curSong' : ''"
        v-for="(item, index) in props.songs"
        :key="item.id"
      >
        <div class="song">
          <p class="song-ind">{{ index + 1 }}</p>
          <img class="song-pic" :src="item.al.picUrl" alt="" />
          <div class="song-info">
            <p class="no-wrap">{{ item.name }}</p>
            <p class="no-wrap">{{ item.ar[0].name }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.song {
  background: white;
  display: flex;
  padding: 0.6rem;
  height: 2.5rem;

  .song-ind {
    flex-shrink: 0;
    width: 2rem;
    margin: 0.3rem 0.1rem 0.1rem 0;
  }

  .song-pic {
    border-radius: 0.3rem;
    width: 2.1rem;
    height: 2.1rem;
    align-self: center;
    margin-right: 0.6rem;
  }

  .song-info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 0.6rem;
  }
}

.curSong {
  color: #ffcd32;
}
</style>
