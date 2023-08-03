<script setup lang="ts">
import type { AlbumType } from '@/type/albumType'
import { toRefs } from 'vue'
import {useRouter} from "vue-router";
import useListStore from "@/stores/listStore";

const props = defineProps<AlbumType>()
const {id, blurPicUrl, name, artist } = toRefs(props)

const router = useRouter()
function toPlaylistPage() {

  router.push({
    name: 'playlist',
    params: {
      id:id.value,
      type: 'album'
    }
  })
}
</script>

<template>
  <div class="album" @click="toPlaylistPage">
    <img :src="blurPicUrl" alt="" />
    <div class="mask"></div>
    <p class="album-name no-wrap">{{ name }}</p>
    <p class="album-artist no-wrap">{{ artist.name }}</p>
  </div>
</template>

<style scoped lang="less">
.album {
  position: relative;
  width: 21%;
  padding: 1rem;
  flex-shrink: 0;

  img {
    width: 100%;
  }
  .mask{
    position: absolute;
    top: 1rem;

    width: calc(100% - 1rem);
    padding-top: calc(100% - 2rem);
    background-image: url('../assets/img/coverall.png');
    background-repeat: no-repeat;
    background-size: 321%;
    background-position: 2% 40.85%;
  }
  .album-name{
    font-size: .6rem;
    margin: .3rem 0;
  }
  .album-artist{
    font-size: .8rem;
    color: #666666;

  }
}
</style>
