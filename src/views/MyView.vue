<script setup lang="ts">
// import vLoading from '@/directive/loadingDir'
import { ref } from 'vue'
import { getSinger } from '@/server/api/singer'
import type { Singer } from '@/type/singer'
import { useRouter } from 'vue-router'

const singers = ref<Singer[]>([])

getSinger(1002).then((res) => {
  singers.value = res
})

const router = useRouter()

function toPlaylistPage(id:number) {
  router.push({
    name: 'playlist',
    params: {
      id: id,
      type: 'singer'
    }
  })
}
</script>

<template>
  <div class="singer-view">
    <ul>
      <li @click="toPlaylistPage(item.id)" v-for="item in singers" :key="item.id">
        <div class="singer">
          <img class="singer-pic" :src="item.picUrl" alt="" />
          <div class="singer-info">
            <p class="no-wrap">{{ item.name }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.singer-view {
  background: white;
  position: absolute;
  overflow: scroll;

  .singer {
    display: flex;
    align-items: center;

    img {
      margin: 1rem;
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
    }
  }
}
</style>
