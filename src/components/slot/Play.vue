<template>
    <div :class="$style.player">
        <div :class="$style.mse" id="mse"></div>
				<BoxLine>
          <template slot="star" >
            <img class="star" @click='btnStar' v-show="isStar" src="../../assets/img/ic_star.png" alt="">
            <img class="star" @click='btnStar' v-show="!isStar" src="../../assets/img/ic_no_star.png" alt="">
          </template>
        </BoxLine>
		</div>
</template>

<script>
import BoxLine from "./BoxLine.vue";
import Player from "xgplayer";
export default {
  data(){
    return{
      isStar:false
    }
  },
  methods:{
    btnStar(){
      this.isStar = !this.isStar
    }
  },
	components:{
    BoxLine
  },
  mounted() {
    let player = new Player({
      id: "mse",
      url:
				"http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
			width:window.innerWidth,
			height:window.innerWidth*(337.5/600)
		});
  }
};
</script>
<style>
.star{
  width: 1.6rem;
  height: 1.4rem;
  margin-left: 4rem;
}
</style>

<style module lang='scss'>
.player {
}

</style>