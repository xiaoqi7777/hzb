<template>
    <div :class="$style.player">
        <div :class="$style.mse" id="mse"  ></div>
        <!-- <video  controls="controls" autoplay="autoplay">
          <source :src="playUrl" />
          Your browser does not support the video tag.
        </video> -->
				<BoxLine :item='item'> 
          <template slot="star" >
            <img class="star" @click='btnStar' v-show="isStar" src="../../assets/img/ic_star.png" alt="">
            <img class="star" @click='btnStar' v-show="!isStar" src="../../assets/img/ic_no_star.png" alt="">
          </template>
        </BoxLine>
		</div> 
</template>

<script>
import BoxLine from "./BoxLine.vue";
import Player from 'xgplayer';
// import hlsjsPlayer from 'xgplayer-hls.js';
export default {
  data(){
    return{
      isStar:false,
      item:null,
      userId:null,
      postData:{
        	"activityId":null,
	        "urlType":"0"
      },
      playUrl:null
    }
  },
  created(){
    this.item = this.$route.query.item
    console.log('播放的数据',this.item)
    this.userId = this.item.userId
    this.postData.activityId = this.item.activityId
    // console.log('id',this.postData.activityId)
    this.postPlayUrl()
  },
  methods:{
    btnStar(){
      this.isStar = !this.isStar
    },
    postPlayUrl(){
      let data = this.postData
      this.axio.post('he_live/getActivityPlayUrl',data).then(data=>{
        // console.log('postdata',data.data)
        let res = data.data.data
        if(this.item.status == 4|| this.item.status == 9 ){
          this.playUrl = res.playbackList[0].playbackUrl
        }else{
          this.playUrl = res.playUrl 
        }
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