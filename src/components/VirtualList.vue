<script setup lang="ts">
import {computed, nextTick, ref, toRefs} from 'vue';


const props = defineProps<{ list: Array<any>, marginTop: number }>()
const {list, marginTop} = toRefs(props)
const listContainer = ref<HTMLElement | null>(null);

const memPage = 3
let pageSize = ref(2)
let itemHeight = 0
const contrainerHeight = ref('0px')
const scrolledNum = ref(0)

const itemsRef = ref()

nextTick(() => {
  if (listContainer.value) {
    const containRect = listContainer.value.getBoundingClientRect()
    const itemEl = listContainer.value.getElementsByTagName('li')[0]
    const itemRect = itemEl.getBoundingClientRect()
    pageSize.value = Math.floor(containRect.height / itemRect.height)
    console.log('pagesize', pageSize)
    itemHeight = itemRect.height
    contrainerHeight.value = list.value.length * itemHeight + 'px'
  }
})
const transY = ref('translateY(0px)')

const showList = computed(() => {
  const totalPages = Math.floor(list.value.length / pageSize.value) + (list.value.length % pageSize.value == 0 ? 0 : 1)

  let scrolledPages = Math.floor(scrolledNum.value / pageSize.value)  //滚动了几页
  console.log(totalPages, scrolledPages)
  if (totalPages - scrolledPages < memPage) {
    scrolledPages = totalPages - memPage
  }
  const startInd = scrolledPages * pageSize.value
  transY.value = `translateY(${startInd * itemHeight + marginTop.value}px)`
  const endInc = startInd + pageSize.value * memPage
  return list.value.slice(startInd, endInc)
})


function onscroll() {
  window.requestAnimationFrame(() => {
    const containerEl = listContainer.value
    if (containerEl) {
      let scrolledIndex = Math.floor((containerEl.scrollTop - marginTop.value) / itemHeight)
      scrolledIndex = scrolledIndex > 0 ? scrolledIndex : 0
      scrolledNum.value = scrolledIndex
    }
  })

}
</script>

<template>
  <div class="v-list-container" ref="listContainer" @scroll="onscroll">
    <div class="list-container">
      <p class="title">
        <slot name="title"></slot>
      </p>
      <ul class="lists">
        <li ref="itemsRef" v-for="(item) in showList" :key="item?.id">
          <slot :itemData="item"></slot>
        </li>
      </ul>
    </div>

  </div>
</template>


<style lang="less" scoped>
.v-list-container {
  overflow: scroll;
  height: 100%;
  max-height: 100vh;
  background: #ff9854;

  .list-container {
    height: v-bind(contrainerHeight);

    .title {
      height: 60px;
      width: 100%;
      transform: translateY(300px);
    }

    .lists {
      transform: v-bind(transY);

    }

    li {
      border: 1px solid red;
    }
  }
}
</style>