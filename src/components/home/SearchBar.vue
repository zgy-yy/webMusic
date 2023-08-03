<script setup lang="ts"></script>

<template>
  <div class="search-bar">
    <span class="icon-font-big iconfont icon-gedan"></span>
    <div class="input-bar">
      <span class="iconfont icon-wangluogequ"></span>
      <input placeholder="歌曲、歌单、歌手"/>
    </div>
    <span class="icon-font-big iconfont icon-yinlechuang"></span>
  </div>
</template>

<style scoped lang="less">
.search-bar {
  padding: .6rem;
  position: sticky;
  background: white;
  z-index: 2;
  top: 0;
  display: flex;
  height: 2.5rem;
  justify-content: space-around;
  align-items: center;
  line-height: 1.5rem;

  .input-bar {
    display: flex;
    align-items: center;
    border-radius: 1rem;
    background-color: #efecec;
    padding: 0 .6rem;

    input {
      width: 15rem;
      height: 1.6rem;
      outline: none;
      border-radius: 1rem;
      background-color: #efecec;
      border: none;
    }
  }
}
</style>
