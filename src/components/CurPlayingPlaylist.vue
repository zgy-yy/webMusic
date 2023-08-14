<script setup lang="ts">
import useSongStore from "@/stores/songStore";
import {storeToRefs} from "pinia";
import type {Song} from "@/type/music";
import {songCanplay} from "@/hooks/playCircle";
import {ref, watch} from "vue";

const songStore = useSongStore()
const {curSong, songList} = storeToRefs(songStore)


const curindex = ref(-1)

watch(curSong, (newSong) => {
  curindex.value = songList.value.findIndex(item => {
    return item.id == newSong?.id
  })
  console.log(curindex)
}, {immediate: true})


function onclickSong(song: Song) {
  console.log(curindex.value)
  songCanplay(song).then((res => {
    if (res == 'ok') {
      songStore.setCurSong(song)
    }
  }))
}


</script>

<template>
  <ul>
    <li @click="onclickSong(item)" v-for="(item,index) in songList" class="item" :key="item.name">
      <p class="index" :class="curindex==index?'act-index':''">
        <span>{{ index }}</span>
      </p>
      <div class="song-info">
        <p class="no-wrap song-name">{{ item.name }}</p>
        <p v-if="item.artists||item.ar" class="no-wrap singer">
        <span v-for="(art,index) in (item.artists||item.ar)" :key="art.name">
          {{ art.name }}<span v-if="index!==(item.artists||item.ar).length-1"> / </span>
        </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">

.item {
  display: flex;
  padding: 8px;
  align-items: center;

  .index {

  }

  .act-index {
    color: #1574ff;
  }

  .song-info {
    text-align: start;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .song-name {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 20px;
    }

    .singer {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 14px;
    }
  }
}
</style>