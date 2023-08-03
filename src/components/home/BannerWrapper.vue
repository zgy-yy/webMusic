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
  margin: 1rem auto;
  border-radius: 1rem;
  width: 95%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  .item-banner {
    transform: v-bind(styleTranslateX);
    width: 100%;
    flex-shrink: 0;

    transition: transform ease-in-out;
    transition-duration: v-bind(transiDurStr);

    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    display: flex;
    justify-content: space-evenly;

    left: 0;
    right: 0;
    width: 50%;

    margin: 0 auto;
    bottom: 0.8rem;

    li {
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(231, 225, 225, 0.8);
      border-radius: 50%;
    }

    .active-li {
      width: 1rem;
      border-radius: 0.4rem;
    }
  }
}
</style>
