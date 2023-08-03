<script setup lang="ts">
import type { PlayList } from '@/type/recommentType'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useListStore from '@/stores/listStore'

const props = defineProps<PlayList>()
const { id, coverImgUrl, tracks } = toRefs(props)

const router = useRouter()
function toPlaylistPage() {

  router.push({
    name: 'playlist',
    params: {
      id: id.value,
      type: 'songlist'
    }
  })
}
</script>

<template>
  <div class="b-playlist" @click="toPlaylistPage">
    <img :src="coverImgUrl" alt="" />
    <ul class="b-songs">
      <li class="song-item no-wrap" v-for="(song, index) in tracks.slice(0, 4)" :key="song.id">
        {{ index + 1 }}.{{ song.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.b-playlist {
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;

  img {
    margin-left: 1rem;
    height: 90%;
  }

  .b-songs {
    height: 90%;
    width: 70%;

    .song-item {
      margin: 0.3rem 0;
      padding-left: 2rem;
      width: 90%;
    }
  }
}
</style>
