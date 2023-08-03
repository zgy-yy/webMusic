<script setup lang="ts">
import type { RecommendPlaylist } from '@/type/recommentType'
import { playNumStr } from '@/utils/index'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<RecommendPlaylist>()
const { id, picUrl, name, playCount } = toRefs(props)

const router = useRouter()

function toPlaylistPage() {
  router.push({
    name: 'playlist',
    params: {
      id:id.value,
      type: 'songlist'
    }
  })
}
</script>

<template>
  <div class="wrapper" @click="toPlaylistPage">
    <div>
      <img :src="picUrl" :alt="name" />
      <p class="play-count">
        <span class="listen-icon"> </span>
        <span>
          {{ playNumStr(playCount) }}
        </span>
        <span> </span>
      </p>
      <div class="mask"></div>
    </div>
    <p class="paly-name">{{ name }}</p>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/less/minxin.less';

.wrapper {
  width: 29%;
  padding: 0.3rem 0.2rem 0.2rem 0.2rem;

  div {
    position: relative;

    img {
      width: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      width: 100%;
      padding-top: 100%;

      background-image: url('../assets/img/coverall.png');
      background-repeat: no-repeat;
      background-size: 274%;
    }

    .play-count {
      line-height: 1.4rem;
      height: 1.5rem;
      color: #ccc;
      font-size: 0.8rem;
      position: absolute;
      width: 100%;
      bottom: 0;
      background-repeat: no-repeat;
      background-image: url('../assets/img/coverall.png');
      background-size: 400%;
      background-position: 0 36.6%;

      .listen-icon {
        background-clip: padding-box;
        padding-left: 1rem;
        background-size: 600%;
        background-position: 0% 1.6%;
        background-image: url('../assets/img/sprite_icon.png');
      }
    }
  }

  .paly-name {
    font-size: 0.7rem;
    line-height: 1.5;
    margin: 0.2rem 0 0.1rem;
    text-align: start;
    .two-line-no-wrap();
  }
}
</style>
