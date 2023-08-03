<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import useListStore from '@/stores/listStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import SongsList from '@/components/playlist/SongsList.vue'
import type { ComputedRef } from 'vue'

const props = defineProps<{ type: string; id: string }>()
const { type, id } = toRefs(props)

const isLoading = ref(true)

const listStore = useListStore()
const { playlistDetail, albumDetail, singerDetail } = storeToRefs(listStore)

let imgUrl: ComputedRef
let bgUrl: ComputedRef
let songs: ComputedRef
if (type.value == 'songlist') {
  listStore.getPlaylistDetail(Number(id.value)).then(() => {
    isLoading.value = false
  })
  imgUrl = computed(() => playlistDetail.value?.coverImgUrl)
  bgUrl = computed(() => `url('${playlistDetail.value?.coverImgUrl}')`)
  songs = computed(() => {
    return playlistDetail.value?.tracks ?? []
  })
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
  router.back()
}
</script>

<!--歌单列表-->
<template>
  <div class="list-main" v-loading="isLoading">
    <div class="top">
      <div class="bg-img"></div>
      <div class="bg-bar">
        <p>
          <span @click="goBack" class="iconfont icon-fanhui icon-font-big"></span>
        </p>
        <img :src="imgUrl" alt="" />
      </div>
    </div>
    <songs-list class="songs no-scroll-bar" :songs="songs"></songs-list>
  </div>
</template>

<style scoped lang="less">
.list-main {
  position: fixed;
  display: flex;
  flex-direction: column;
  background: white;
  .top {
    background-color: rgba(234, 220, 220, 0.16);
  }

  .bg-img {
    width: 86%;
    top: 0;
    z-index: -1;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    background-image: v-bind(bgUrl);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    filter: blur(20px);
    height: 13rem;
  }

  .bg-bar {
    width: 100%;
    height: 13rem;
    text-align: center;

    p {
      height: 2rem;
      padding: 0.3rem 0 0.3rem 0.8rem;
      text-align: start;
      top: 0;
      bottom: 0;
    }

    img {
      margin-top: 10px;
      border-radius: 1rem;
      border: 0.3rem solid rgba(238, 234, 243, 0.37);
      width: 30%;
    }
  }
}

.songs {
  position: absolute;
  flex-grow: 1;
  width: 100vw;

  top: 2.3rem;
  bottom: 0;
  overflow: scroll;
  padding-top: 10.6rem;
}
</style>