<template>
    <div :class="$style.player">
        <div :class="$style.mse" id="mse"></div>
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
import 'xgplayer';
import hlsjsPlayer from 'xgplayer-hls.js';
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
    this.userId = this.item.userId
    this.postData.activityId = this.item.activityId
    console.log('id',this.item.activityId)
    this.postPlayUrl()
  },
  methods:{
    btnStar(){
      this.isStar = !this.isStar
    },
    postPlayUrl(){
      let data = this.postData
      console.log('11',data)
      this.axio.post('he_live/getActivityPlayUrl',data).then(data=>{
        console.log('postdata',data.data)
        let res = data.data.data
        this.playUrl = res.playUrl
        console.log(this.playUrl)
      })
    }
  },
	components:{
    BoxLine
  },
  mounted() {

    let player = new hlsjsPlayer({
      id: "mse",
      url:
				"https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8",
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