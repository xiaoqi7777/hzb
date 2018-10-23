<template>
<div id="demo">
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="bounce">
    <p v-if="show">he12333333333333333llo</p>
  </transition>
</div>
</template>

<script>
  export default {
    data(){
      return{
        show: true
      }
    }
  }
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 5s infinite;
  animation-timing-function: steps(1)
}
.bounce-leave-active {
  animation: bounce-in 5s reverse;
  animation-timing-function: steps(1)
}
@keyframes bounce-in {
  0% {
    transform: translateX(100px)
  }
  25% {
   transform: translateX(200px)
  }
  50% {
   transform: translateX(300px)
  }
  75% {
   transform: translateX(400px)
  }
  100% {
    transform: translateX(500px)
  }
}
</style>