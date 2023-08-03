<script setup lang="ts">
</script>

<template>
 <div class="loading-wrapper">
   <div class="loading"></div>
 </div>
</template>

<style scoped lang="less">
.loading-wrapper{
  position: fixed;
  background: #f5f2f1;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.loading {

  margin: 0 auto;
  width: 50px;
  perspective: 200px;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 20px;
  height: 20px;
  content: '';
  animation: jumping 0.5s infinite alternate;
  background: rgba(0, 0, 0, 0);
}

.loading:before {
  left: 0;
}

.loading:after {
  right: 0;
  animation-delay: 0.15s;
}

@keyframes jumping {
  0% {
    transform: scale(1) translateY(0px) rotateX(0deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(1.2) translateY(-25px) rotateX(45deg);
    background: #000;
    box-shadow: 0 25px 40px #000;
  }
}
</style>
