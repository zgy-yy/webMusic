<script setup lang="ts">
import {computed, ref, toRefs} from 'vue'
import useListStore from '@/stores/listStore'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import type {ComputedRef} from 'vue'
import SongItem from "@/components/SongItem.vue";
import useSongStore from "@/stores/songStore";

const props = defineProps<{ type: string; id: string }>()
const {type, id} = toRefs(props)

const songStore = useSongStore()

const isLoading = ref(true)
const listStore = useListStore()
const {playlistDetail, albumDetail, singerDetail} = storeToRefs(listStore)


const detail = ref({
  name: '',
  description: ''
})

let imgUrl: ComputedRef
let bgUrl: ComputedRef
let songs: ComputedRef
if (type.value == 'songlist') {
  listStore.getPlaylistDetail(Number(id.value)).then(() => {
    isLoading.value = false
    detail.value.name = <string>playlistDetail.value?.name
    detail.value.description = <string>playlistDetail.value?.description
  })
  imgUrl = computed(() => playlistDetail.value?.coverImgUrl)
  bgUrl = computed(() => `url('${playlistDetail.value?.coverImgUrl}')`)
  songs = computed(() => {
    return playlistDetail.value?.tracks ?? []
  })
  console.log(songs)
}
if (type.value == 'album') {
  listStore.getDetailAlbum(Number(id.value)).then(() => {
    isLoading.value = false
  })
  imgUrl = computed(() => albumDetail.value?.album.picUrl)
  bgUrl = computed(() => `url('${albumDetail.value?.album.picUrl}')`)
  songs = computed(() => {
    return albumDetail.value?.songs ?? []
  })
}
if (type.value == 'singer') {
  listStore.getDeatilSinger(Number(id.value)).then(() => {
    isLoading.value = false
  })
  imgUrl = computed(() => singerDetail.value?.artist.picUrl)
  bgUrl = computed(() => `url('${singerDetail.value?.artist.picUrl}')`)
  songs = computed(() => {
    return singerDetail.value?.hotSongs ?? []
  })
}

const router = useRouter()

function goBack() {
  console.log(1)
  router.back()
}

function setSonglist() {
  songStore.setSonglist(songs.value)
}

</script>

<!--歌单列表-->
<template>
  <div class="list-main" v-loading="isLoading">
    <div class="top">
      <div class="bg-img"></div>
      <div class="bg-bar">
        <p class="nav">
          <img @click="goBack" class="icon" src="../../src/assets/icon/back.svg" alt=""/>
          <img class="icon" src="../../src/assets/icon/share.svg" alt=""/>
        </p>
        <img :src="imgUrl" alt=""/>
        <div>
          <p class="no-wrap name"> {{ detail.name }}</p>
        </div>
      </div>
    </div>

    <div class="songs-list no-scroll-bar">
      <template v-for="item in songs">
        <song-item @set-song-list="setSonglist" class="song-item" v-bind="item"></song-item>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.list-main {
  position: fixed;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .bg-img {
    top: 0;
    z-index: -1;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-image: v-bind(bgUrl);
    background-position: center;
    background-size: 110%;
    background-repeat: no-repeat;
    filter: blur(20px);
    height: 344px;
  }

  .bg-bar {
    text-align: center;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.68);
    height: 344px;
    width: 100%;

    .nav {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        width: 24px;
        height: 24px;
        padding: 0 16px;
      }
    }

    & > img {
      margin: 32px auto;
      left: 0;
      right: 0;
      border-radius: 1rem;
      border: 0.3rem solid rgba(239, 237, 241, 0.37);
      width: 133px;
      height: 133px;
    }

  }
}

.name {
  width: 300px;
  margin: 0 auto;
}

.songs-list {
  margin-top: 44px;
  overflow-y: auto;
  padding-top: 300px;

  .song-item {
    //width: 100%;
    padding: 0 16px;
    margin: 0 auto;
  }
}
</style>