<script setup lang="ts">
import useBanner from '@/stores/home/bannerStore'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

const bannerStore = useBanner()
bannerStore.getBanner() //获取banner数据
const { banners } = storeToRefs(bannerStore)

const transiDur = 600
let transiDurStr = transiDur + 'ms'
const transIndex = ref(0)
const styleTranslateX = computed(() => `translateX(-${transIndex.value * 100}%)`)

setInterval(() => {
  transiDurStr = transiDur + 'ms'
  transIndex.value += 1
  if (transIndex.value >= banners.value.length - 1) {
    setTimeout(() => {
      transiDurStr = '0ms'
      transIndex.value = 0
    }, transiDur) //延时时间与动画时间相同
  }
}, 3000)
</script>

<template>
  <div class="wrapper">
    <template v-for="item in banners" :key="item.id">
      <li class="item-banner">
        <img :src="item.imageUrl" alt="" />
      </li>
    </template>
    <ol class="indicator" v-if="banners?.length">
      <li
        :class="transIndex % (banners?.length - 1) == index ? 'active-li' : ''"
        v-for="(ind, index) in banners?.length - 1"
        :key="ind"
      ></li>
    </ol>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  height: 160px;
  background: #666666;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  .item-banner {
    transform: v-bind(styleTranslateX);
    width: 100%;
    flex-shrink: 0;
    transition: transform ease-in-out;
    transition-duration: v-bind(transiDurStr);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .indicator {
    position: absolute;
    left: 8px;
    display: flex;
    justify-content: start;
    width: 50%;
    bottom: 0.8rem;

    li {
      width: 8px;
      height: 4px;
      border-radius: 6px;
      margin-right: 4px;
      background: rgba(255, 255, 255, 1);
    }

    .active-li {
      width: 18px;
      height: 4px;
    }
  }
}
</style>
