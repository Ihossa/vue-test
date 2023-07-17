<script setup>
 import {defineEmits} from "vue";

 const props = defineProps({
   openMenu: {
     type: Boolean
   }
 })

 const emits = defineEmits(['onClick'])
</script>

<template>
  <div class="menu-wrapper" @click="() => {emits('onClick')}" :class="{ active: props.openMenu }">
    <div class="menu-bar one"></div>
    <div class="menu-bar two"></div>
  </div>
</template>

<style scoped>

.menu-wrapper {
  width: 20px;
  height: auto;
  cursor: pointer;
  position: relative;
}

.menu-bar {
  position: absolute;
  width: 100%;
  height: 1.4px;
  background: black;
  left: 0%;
}

.menu-wrapper:hover .menu-bar {
  /*animation-duration: 1s;
  animation-name: slideOut;
  animation-direction: alternate;
  animation-timing-function: ease-out;*/
}



.one {
  top: 0px;
  animation-delay: 0.1s;
  transition: all 0.3s;
}

.two {
  top: 8px;
  transition: all 0.3s;
}


@keyframes slideOut {
  0% {
    width: 100%;
    left: 0%;
    right: auto;
  }

  50% {
    width: 0%;
    left: 0%;
    right: auto;
  }
  51% {
    width: 0%;
    right: 0%;
    left: auto;
  }

  100% {
    width: 100%;
    right: 0%;
    left: auto;
  }
}

.menu-wrapper:hover .menu-bar.active {
  animation:none;
}
.active .one{
  top: 50%;
  left: 0%;
  transform: rotate(45deg);
}
.active .two{
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}
</style>