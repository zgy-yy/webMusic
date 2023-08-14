<script setup lang="ts">
import {computed, onActivated, onMounted, ref, toRefs} from 'vue'
import useListStore from '@/stores/listStore'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import type {ComputedRef} from 'vue'
import SongItem from "@/components/SongItem.vue";
import useSongStore from "@/stores/songStore";

const props = defineProps<{ id: string }>()
const {id} = toRefs(props)

const songStore = useSongStore()

const isLoading = ref(true)
const listStore = useListStore()
const {playlistDetail} = storeToRefs(listStore)

const imgUrl: ComputedRef = computed(() => (playlistDetail.value?.coverImgUrl))
const bgUrl: ComputedRef = computed(() => (`url(${playlistDetail.value?.coverImgUrl})`))
const songs: ComputedRef = computed(() => (playlistDetail.value?.tracks))

listStore.getPlaylistDetail(Number(id.value)).then(() => {
  isLoading.value = false
})

const router = useRouter()

function goBack() {
  router.back()
}

function setSongList() {
  songStore.setSonglist(songs.value)
}

// switch
const switchItems = [
  {name: '单曲', active: true},
  {name: '评论', active: false}
]
// switch end
const show = ref(false)

</script>

<!--歌单列表-->
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
          <p class="no-wrap name"> {{ playlistDetail?.name }}</p>
        </div>
        <div class="switch-bar">
          <template v-for="item in switchItems">
            <p :class="item.active?'active-sw-bar':''">{{ item.name }}</p>
          </template>
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

.list-main {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .top {
    flex-shrink: 0;
    position: relative;
    height: 44px;
  }

  .bg-img {
    top: 0;
    z-index: -1;
    position: absolute;
    width: 100%;
    background-image: v-bind(bgUrl);
    background-position: center;
    background-size: 110%;
    background-repeat: no-repeat;
    filter: blur(20px);
    height: 344px;
    overflow: hidden;
  }

  .top-content {
    text-align: center;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.62);
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

.switch-bar {
  position: absolute;
  bottom: 6px;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.24px;
  line-height: 20px;
  color: rgba(128, 128, 128, 1);

  .active-sw-bar {
    position: relative;
    color: black;

    &::after {

      position: absolute;
      left: 0;
      bottom: 0.5px;
      content: ' ';
      display: block;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: rgba(0, 213, 255, 0.82);
    }
  }
}


.songs-list {
  overflow-y: auto;
  padding-top: 300px;

  .play-all {
    position: relative;

    .left {
      line-height: 1.5;

      span {
        margin-left: 6px;
      }
    }

    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

  }

  .song-item {
    background: white;
    padding: 0 16px;
    margin: -1px auto;
  }
}
</style>