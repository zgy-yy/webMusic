<script setup lang="ts">
import { useRouter } from 'vue-router'
import CirclePlay from '@/components/CirclePlay.vue'

const router = useRouter()
const tabBarData = [
  {
    name: '推荐',
    path: '/',
    component: null
  },
  {
    name: '我的',
    path: '/my',
    component: null
  }
]

function changePage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="wrapper">
    <template v-for="bar in tabBarData" :key="bar.path">
      <div @click="changePage(bar.path)">
        <div v-if="bar.name !== '播放'">{{ bar.name }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  background: #93b5b6;
  display: flex;
  height: 3rem;
  align-items: center;

  justify-content: space-around;
}


</style>
