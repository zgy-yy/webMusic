<script setup lang="ts">
import {getSingerHot} from "@/server/api/singer";
import {ref} from "vue";
import type {Singer} from "@/type/singer";
import {useRouter} from "vue-router";
import VirtualList from "@/components/VirtualList.vue";
import VScroll from "@/components/VScroll.vue";

const miniLoading = ref(true)
const singers = ref<Singer[]>([])
getSingerHot().then(res => {
  singers.value = res
  miniLoading.value = false
})
const router = useRouter()

function toPlaylistPage(id: number) {
  router.push({
    name: 'singerDetailList',
    params: {
      id: id
    }
  })
}
</script>

<template>
  <div class="singer-page">
    <div :class="miniLoading?'mini-loading':''"></div>
    <v-scroll v-if="singers.length>0">
      <li v-for="item in singers" :key="item.id" @click="toPlaylistPage(item.id)">
        <div class="singer">
          <img class="singer-pic" v-lazy="item.picUrl" :loading="'/src/assets/icon/none.svg'" alt=""/>
          <div class="singer-info">
            <p class="no-wrap">{{ item.name }}</p>
          </div>
        </div>
      </li>
    </v-scroll>
  </div>
</template>

<style scoped lang="less">
.singer-page {
  overflow: scroll;

  .singer {
    display: flex;
    align-items: center;
    padding: 8px;

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }
}
</style>