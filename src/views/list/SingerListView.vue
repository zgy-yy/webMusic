<script setup lang="ts">

import SongItem from "@/components/SongItem.vue";
import {computed, onActivated, onMounted, ref, toRefs} from "vue";
import useListStore from "@/stores/listStore";
import useSongStore from "@/stores/songStore";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const props = defineProps<{ id: string }>()
const {id} = toRefs(props)

const songStore = useSongStore()

const isLoading = ref(true)
const listStore = useListStore()
const {singerDetail} = storeToRefs(listStore)
listStore.getDeatilSinger(Number(id.value)).then(() => {
  isLoading.value = false
})
const imgUrl = computed(() => singerDetail.value?.artist.picUrl)
const bgUrl = computed(() => `url('${singerDetail.value?.artist.picUrl}')`)
const songs = computed(() => {
  return singerDetail.value?.hotSongs ?? []
})

const router = useRouter()
function goBack() {
  router.back()
}
function setSongList() {
  songStore.setSonglist(songs.value)
}


</script>

<template>
  <div class="list-main" v-loading="isLoading">
    <div class="top">
      <div class="bg-img"></div>
      <div class="top-content">
        <p class="nav">
          <img @click="goBack" class="icon" src="/src/assets/icon/back.svg" alt=""/>
          <img class="icon" src="/src/assets/icon/share.svg" alt=""/>
        </p>
        <img :src="imgUrl" alt=""/>
        <div>
          <p class="no-wrap name"> {{ singerDetail?.name }}</p>
        </div>
        <div class="switch-bar">
<!--          <template v-for="item in switchItems">-->
<!--            <p :class="item.active?'active-sw-bar':''">{{ item.name }}</p>-->
<!--          </template>-->
        </div>
      </div>
    </div>

    <div class="songs-list no-scroll-bar">
      <div class="play-all">
        <p class="left">
          <img src="/src/assets/icon/playall.svg">
          <span>播放全部</span>
        </p>
        <p>
          <img src="/src/assets/icon/select.svg">
        </p>
      </div>
      <template v-for="item in songs" :key="item.name">
        <song-item @set-song-list="setSongList" class="song-item" v-bind="item"></song-item>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>