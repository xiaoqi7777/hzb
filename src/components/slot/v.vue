<template>
  <div>
<Xgplayer :config="config" :format='format' @player="Player = $event"/>
  </div>
</template>

<script>
import Xgplayer from 'xgplayer-vue';
  export default {
    data () {
      return {
        config: {
          id: 'vs',
          url: '/xgplayer-demo.mp4'
        },
        format: 'mp4',
        Player: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
      }
    },
    components:{
        Xgplayer
      }
  }
</script>

<style scoped>

</style>