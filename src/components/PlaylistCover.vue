<script setup lang="ts">
import type {RecommendPlaylist} from '@/type/recommentType'
import {playNumStr} from '@/utils/index'
import {toRefs} from 'vue'
import {useRouter} from 'vue-router'

const props = defineProps<RecommendPlaylist>()
const {id, picUrl, name, playCount} = toRefs(props)

const router = useRouter()

function toPlaylistPage() {
  router.push({
    name: 'songPlaylist',
    params: {
      id: id.value
    }
  })
}
</script>

<template>
  <div class="wrapper" @click="toPlaylistPage">
    <div>
      <img v-lazy="picUrl" :alt="name"/>
      <p class="play-count">
        <span>
          {{ playNumStr(playCount) }}
        </span>
        <img class="icon-play" alt="" src="/src/assets/icon/playdot.svg"/>
      </p>
    </div>
    <p class="play-name">{{ name }}</p>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/less/minxin.less';

.wrapper {
  width: 120px;
  height: 158px;
  margin-right: 16px;

  div {
    position: relative;

    img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
    }

    .play-count {
      background: white;
      width: 42px;
      height: 16px;
      position: absolute;
      right: 6px;
      border-radius: 10px;
      bottom: 10px;
      padding: 0 5px;

      span {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: -0.24px;
        line-height: 16px;
        color: rgba(45, 45, 45, 1);
        vertical-align: top;
      }

      .icon-play {
        float: right;
        position: absolute;
        right: 0;
        width: 16px;
        height: 16px;
        //position: relative;
        //right: -5px;
      }
    }
  }

  .play-name {
    width: 120px;
    height: 34px;
    /** 文本 */
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.24px;
    line-height: 18px;
    color: rgba(58, 58, 58, 1);
    .two-line-no-wrap();
  }
}
</style>
