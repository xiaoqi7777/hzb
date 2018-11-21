<template>
    <div :class="$style.player">
        <div :class="$style.mse" id="mse"  ></div>
				<!-- <BoxLine :item='item'> 
          <template slot="star" >
            <img class="star" @click='btnStar' v-show="isStar" src="../../assets/img/ic_star.png" alt="">
            <img class="star" @click='btnStar' v-show="!isStar" src="../../assets/img/ic_no_star.png" alt="">
          </template>
        </BoxLine> -->
		</div>  
</template>

<script>
import BoxLine from "./BoxLine.vue";
import Player from 'xgplayer';
// import hlsjsPlayer from 'xgplayer-hls.js';
export default {
  data(){
    return{
      // isStar:false,
      item:null,
      userId:null,
      postData:{
        	"resourceId":null,
	        "urlType":"0"
      },
      playUrl:null
    }
  },
  created(){
    this.item = this.$route.query.item
    this.userId = this.item.userId
    this.postData.resourceId = this.item.resourceId
    this.postPlayUrl()
  },
  methods:{
    // btnStar(){
    //   this.isStar = !this.isStar
    // },
    postPlayUrl(){
      let data = this.postData
      this.axio.post('he_live/getScenePlayUrl',data).then(data=>{
        // console.log('shijing-----------------',data.data.data)
        let res = data.data.data
        this.playUrl = res.playUrl || res.profileList[0].url
        // console.log('.......',this.playUrl)
          this.$emit('childrenVlue',true)
          let player = new Player({
            id: "mse",
            url:this.playUrl,
            width:window.innerWidth,
            height:window.innerWidth*(337.5/600),
            playsinline:true,
            autoplay: true,

          });
      })
    }
  },
	components:{
    BoxLine
  },
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
  .mse{

  }
}

</style>