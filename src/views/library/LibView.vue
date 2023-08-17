<script setup lang="ts">

import {onActivated, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const pages = reactive([
  {name: '歌单', path: 'musicList'}, {name: '专辑', path: 'album'}, {name: '歌手', path: 'singer'}
])

const route = useRoute()
const curPageIndex = ref(0)
onActivated(() => {
  curPageIndex.value = pages.findIndex(item => {
    return item.path == route.name
  })
})


const router = useRouter()

function changePage(index: number) {
  router.push({name: pages[index].path}).then(() => {
    curPageIndex.value = index
  })
}


</script>

<template>
  <div class="lib-view">
    <section class="top">
      <img src="/src/assets/icon/option.svg" alt=""/>
      <ul class="page-name">
        <li @click="changePage(index)" :class="curPageIndex==index?'active-li':''" v-for="(item,index) in pages"
            :key="item.name">
          {{ item.name }}
        </li>
      </ul>
      <img src="/src/assets/icon/search.svg" alt=""/>
    </section>
    <router-view class="view-pages" v-slot="{Component}">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="less">
.lib-view {
  padding: 0 16px 8px 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.view-pages {
  flex: 1;
}

// 顶部导航
.top {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-name {
    display: flex;
    justify-content: space-around;
    width: 70%;

    li {
      width: 40px;
      height: 24px;
      opacity: 1;
      /** 文本1 */
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 24px;
      color: rgba(35, 35, 35, 1);
      position: relative;
      text-align: center;
    }

    .active-li::after {
      position: absolute;
      left: 0;
      bottom: 2px;
      border-radius: 8px;
      content: '';
      display: inline-block;
      width: 100%;
      height: 6px;
      background: rgba(0, 213, 255, 0.7);
    }
  }
}
</style>