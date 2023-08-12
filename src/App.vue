<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import PlayView from '@/views/play/PlayView.vue'
import useStateStore from '@/stores/stateStore'
import {storeToRefs} from 'pinia'
import CirclePlay from '@/components/CirclePlay.vue'
import useSongStore from '@/stores/songStore'

const route = useRoute()
const stateStore = useStateStore()
const {showNormalPlayer} = storeToRefs(stateStore)

const songStore = useSongStore()
const {curSong} = storeToRefs(songStore)


</script>

<!--      :class="!route.meta.hiddenTabBar ? '' : 'hidden-bar'"-->
<template>
  <router-view
      class="main-view no-scroll-bar"
      v-slot="{ Component }"
  >
    <transition>
      <keep-alive exclude="ListView,PlayView">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  <transition name="bar">
    <tab-bar v-if="!route.meta.hiddenTabBar" class="tab-bar"/>
  </transition>
  <circle-play v-if="curSong"></circle-play>
  <transition name="player">
    <play-view v-if="showNormalPlayer"></play-view>
  </transition>
</template>

<style scoped lang="less">

.main-view {
  position: fixed;
  top: 0;
  bottom: 5rem;
  left: 0;
  right: 0;
}

.tab-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
}


.hidden-bar {
  bottom: 0;
}

.bar-leave-active,
.bar-enter-active {
  transition: transform 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  z-index: -1;
}

.bar-leave-to,
.bar-enter-from {
  transform: translateY(100%);
}

.player-leave-active,
.player-enter-active {
  transition: transform 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  z-index: 99;
}

.player-leave-to,
.player-enter-from {
  transform: translateY(100%);
}


</style>
