<script setup lang="ts">
import type {Song} from "@/type/music";
import {toRaw, toRefs} from "vue";
import {getLocalUrl} from "@/utils";
import useSongStore from "@/stores/songStore";
import {songCanplay} from "@/hooks/playCircle";


const props = defineProps<Song>()
const {name, album, artists, al, ar} = toRefs(props)

const emits = defineEmits<{
  (e: 'setSongList'): void
}>()



const songStore = useSongStore()

function setPlay() {
  const rowSong = toRaw(props)
  songStore.setCurSong(rowSong)
  emits('setSongList')

}
</script>

<template>
  <div class="song" @click="setPlay">
    <img class="song-pic" :src="album?.picUrl||al?.picUrl" alt=""/>
    <div class="song-info">
      <p class="no-wrap song-name">{{ name }}</p>
      <p v-if="artists||ar" class="no-wrap singer">
        <span v-for="(art,index) in (artists||ar)" :key="art.name">
          {{ art.name }}<span v-if="index!==(artists||ar).length-1"> / </span>
        </span>
      </p>
    </div>
    <embed class="icon-more" type="image/svg+xml" :src="getLocalUrl('../assets/icon/more.svg')"/>
  </div>
</template>

<style scoped lang="less">
.song {
  position: relative;
  display: flex;
  height: 64px;
  background: white;

  .song-pic {
    border-radius: 8px;
    width: 48px;
    height: 48px;
    margin-right: 8px;
    align-self: center;
  }

  .song-info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 36px;

    .song-name {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 20px;
      color: rgba(85, 85, 85, 1);
    }

    .singer {
      margin-top: 6px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 14px;
      color: rgba(151, 151, 151, 1);
    }
  }

  .icon-more {
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 24px;
    margin: auto;
    right: 12px;

  }
}

</style>