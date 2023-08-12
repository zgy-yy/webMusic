<script setup lang="ts">
import type {Song} from "@/type/music";
import {toRefs} from "vue";

const props = defineProps<Song>()
const {name, album, artists} = toRefs(props)
</script>

<template>
  <div class="song">
    <img class="song-pic" :src="album?.picUrl" alt=""/>
    <div class="song-info">
      <p class="no-wrap song-name">{{ name }}</p>
      <p v-if="artists" class="no-wrap singer">
        <span v-for="(art,index) in artists" :key="art.name">{{ art.name }}
        <span v-if="index!==artists.length-1"> / </span>
        </span>
      </p>
    </div>
    <embed class="icon-more" type="image/svg+xml" src="src/assets/icon/more.svg"/>
  </div>
</template>

<style scoped lang="less">
.song {
  position: relative;
  display: flex;
  height: 64px;
  width: 300px;
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

    //width: 24px;
  }
}

</style>