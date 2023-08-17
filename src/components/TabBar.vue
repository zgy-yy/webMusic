<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const tabBarData = [
  {
    name: '首页',
    path: '/',
    icon: 'shouye.svg',
    actIcon: 'act-shouye.svg'
  },
  {
    name: '曲库',
    path: '/lib',
    icon: 'quku.svg',
    actIcon: 'act-quku.svg'
  },
  {
    name: '我的',
    path: '/my',
    icon: 'wode.svg',
    actIcon: 'act-wode.svg'
  }
]

function changePage(path: string) {
  router.push(path)
}

const route = useRoute()
</script>

<template>
  <div class="wrapper">
    <template v-for="bar in tabBarData" :key="bar.path">
      <div class="item" @click="changePage(bar.path)">
        <img class="icon" alt=""
             :src="`/src/assets/icon/tab-bar/${bar.path===route.path?bar.actIcon:bar.icon}`"/>
        <span>{{ bar.name }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  width: 376px;
  height: 50px;
  align-items: center;

  justify-content: space-around;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 24px;
    }

    span {
      margin-top: 4px;
      height: 14px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 14px;
      color: rgba(120, 120, 120, 1);
    }
  }
}

</style>
