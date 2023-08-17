<script setup lang="ts">
import {computed, reactive, ref, toRefs} from 'vue'
import useListStore from '@/stores/listStore'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import type {ComputedRef} from 'vue'
import useSongStore from "@/stores/songStore";
import SongItem from "@/components/SongItem.vue";
import VScroll from "@/components/VScroll.vue";


const props = defineProps<{
  id: string
}>()
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
// 索引改变
const startIndex = ref(0);
const endIndex = ref(6);
const handleIndexChange = (start: number, end: number) => {
  startIndex.value = start;
  endIndex.value = end;
}


// 截取显示的数据
const lastData = computed(() => {
  return songs.value.slice(startIndex.value, endIndex.value)
})

const data = reactive<{
  list: number[]
}>({list: []});

for (let i = 0; i < 999; i++) {
  data.list.push(i);
}


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
      </div>
    </div>

    <v-scroll>
      <template #top>
        <div class="ignore">
          <img class="core-img" :src="imgUrl" alt=""/>
          <p class="no-wrap name"> {{ playlistDetail?.name }}</p>
          <div class="switch-bar">
            <template v-for="item in switchItems" :key="item.name">
              <p :class="item.active?'active-sw-bar':''">{{ item.name }}</p>
            </template>
          </div>
        </div>
      </template>
      <template #default>
        <song-item class="items" v-for="itemData in songs" @set-song-list="setSongList"
                   :key="itemData.id"
                   :id="itemData.id"
                   :pic="itemData.al.picUrl" :name="itemData.name" :singer="itemData.ar"></song-item>
      </template>

    </v-scroll>
  </div>
</template>

<style scoped lang="less">
.list-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .top {
    position: relative;

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
      background-color: rgba(255, 255, 255, 0.1);

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
    }
  }

  .ignore {
    width: 100%;
    text-align: center;

    .core-img {
      margin: 32px auto;
      border-radius: 1rem;
      border: 0.3rem solid rgba(239, 237, 241, 0.37);
      width: 133px;
      height: 133px;
    }

    .name {
      width: 300px;
      margin: 0 auto;
    }

    .switch-bar {
      margin-top: 32px;
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
  }

}

.items {
  margin: auto;
  padding: 2px 16px;
}
</style>