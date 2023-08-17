<script lang="tsx" setup>
import Banner from '@/views/home/home-components/BannerWrapper.vue'
import PlaylistCover from '@/components/PlaylistCover.vue'
import useRecommendStore from '@/stores/home/recommendStore'
import {storeToRefs} from 'pinia'

import {ref} from 'vue'
import TopBar from "@/views/home/home-components/TopBar.vue";
import SongItem from "@/components/SongItem.vue";
import useSongStore from "@/stores/songStore";


const isLoading = ref(true)

const recommendStore = useRecommendStore()
recommendStore.haveRecommendedPlaylists()
recommendStore.haveNewAlbum().then(() => {
  isLoading.value = false
})
recommendStore.haveNewSongs()
recommendStore.haveRecPlaylist()
const {hotRecommend, newSongs} = storeToRefs(recommendStore)

const songStore = useSongStore()

function setPlayList() {
  songStore.setSonglist(newSongs.value)
}
</script>

<template>
  <div class="main" v-loading="isLoading">
    <top-bar/>
    <banner class="banner"/>

    <div class="section">
      <h3>
        <div class="title">
          <embed class="icon icon-opt" type="image/svg+xml" src="src/assets/icon/triangle.svg"/>
          <span>推荐歌单</span>
        </div>
        <div class="more">
          <span>更多</span>
        </div>
      </h3>
      <div class="recommend-list no-scroll-bar">
        <template v-for="item in hotRecommend" :key="item.id">
          <playlist-cover class="section-item" v-bind="item"></playlist-cover>
        </template>
      </div>
    </div>

    <div class="section">
      <h3>
        <div class="title switching-unit">
          <span class="active-unit">新歌</span>
          <span>猜你喜欢</span>
        </div>

        <div class="more">
          <span>更多</span>
        </div>
      </h3>
      <div class="recommend-list new-songs no-scroll-bar">
        <template v-for="itemSong in newSongs">
          <song-item  @set-song-list="setPlayList" class="song-items" :name="itemSong.name"
                     :id="itemSong.id"
                     :singer="itemSong.artists" :mp3-url="itemSong.mp3Url" :pic="itemSong.album.picUrl"
          ></song-item>
        </template>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.main {
  overflow-y: scroll;
  overflow-x: hidden;

  .banner {
    margin: 8px 16px;
  }

  .section {
    margin: 16px;
    left: 16px;
    height: 190px;

    h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        height: 24px;

        & > span {
          position: relative;
          left: -6px;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.24px;
          line-height: 24px;
          color: rgba(35, 35, 35, 1);
          text-align: center;
        }
      }

      .switching-unit {
        & > span {
          left: 0;
          margin-right: 24px;
        }

        .active-unit::after {
          content: '';
          display: inline-block;
          width: 32px;
          height: 6px;
          border-radius: 8px;
          background: rgba(0, 213, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }

      .more {
        margin-right: 12px;
        width: 36px;
        height: 16px;

        font-size: 9px;
        font-weight: 700;
        letter-spacing: -0.24px;
        line-height: 12px;
        text-align: center;
        vertical-align: top;
      }
    }
  }
}

.section-item {
  flex-shrink: 0;
}

.recommend-list {
  margin-top: 8px;
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
}

.new-songs {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列等分宽度 */

  .song-items {
    width: 300px;
  }
}

</style>
