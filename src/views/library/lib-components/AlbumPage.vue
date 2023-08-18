<script setup lang="ts">

import {getHotAlbums} from "@/server/api/album";
import AlbumCover from "@/components/AlbumCover.vue";
import {ref} from "vue";
import type {AlbumType} from "@/type/albumType";

const miniLoading = ref(true)
const data = ref<AlbumType[]>()
getHotAlbums().then(res => {
  miniLoading.value = false
  data.value = res
})

</script>

<template>
  <div class="main-box no-scroll-bar">
    <template v-for="item in data" :key="item.id">
      <album-cover v-bind="item"></album-cover>
    </template>
  </div>
</template>

<style scoped lang="less">
.main-box {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: space-around;
}
</style>