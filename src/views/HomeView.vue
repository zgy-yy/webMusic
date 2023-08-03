<script lang="tsx" setup>
import Banner from '@/components/home/BannerWrapper.vue'
import PlaylistCover from '@/components/PlaylistCover.vue'
import useRecommendStore from '@/stores/home/recommendStore'
import { storeToRefs } from 'pinia'
import AlbumCover from '@/components/AlbumCover.vue'
import BPlaylist from '@/components/home/BPlaylist.vue'
import SearchBar from '@/components/home/SearchBar.vue'
import { ref } from 'vue'
import PlayView from '@/views/PlayView.vue'
import MyView from '@/views/MyView.vue'

const isLoading = ref(true)

const recommendStore = useRecommendStore()
recommendStore.getHotList()
recommendStore.getNewAlbum().then(() => {
  isLoading.value = false
})
recommendStore.getRecPlaylist()
const { hotRecommend, newAlbum, playListRecom } = storeToRefs(recommendStore)
</script>

<template>
    <div class="main" v-loading="isLoading">
      <search-bar></search-bar>
      <banner></banner>

      <div class="section">
        <h3>热门推荐</h3>
        <div class="recommend-list no-scroll-bar">
          <template v-for="item in hotRecommend" :key="item.id">
            <playlist-cover class="section-item" v-bind="item"></playlist-cover>
          </template>
        </div>
      </div>

      <div class="section">
        <h3>新碟上架</h3>
        <div class="recommend-list new-album no-scroll-bar">
          <template v-for="item in newAlbum" :key="item.id">
            <album-cover v-bind="item"></album-cover>
          </template>
        </div>
      </div>

      <template v-for="item in playListRecom" :key="item.id">
        <b-playlist v-bind="item"></b-playlist>
      </template>
    </div>
</template>

<style lang="less" scoped>
.main {
  position: fixed;
  overflow: scroll;
  padding: 0 0.1rem;
}

.section {
  background: #f0f5ef;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem;

  h3 {
    //background: #666666;
  }
}

.section-item {
  flex-shrink: 0;
}

.recommend-list {
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
}


</style>
