<template>
   <div >

<mt-navbar fixed class="page-part" v-model="selected">
  <mt-tab-item id="1">
		和直播
	</mt-tab-item>
  <mt-tab-item id="2">
		 实景
	</mt-tab-item>
</mt-navbar>


<!-- tab-container -->
<mt-tab-container v-model="selected" class="page-padding">

  <mt-tab-container-item id="1">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
      <Box v-if="isShow" v-for="(item,index) in getListData" :item='item' :key="index" />
      <!-- loadBottom  动态获取数据 初始化的时候 没有就会触发他 模拟一个假的高度够的放着-->
      <div v-if="!isShow" class="div">数据加载中...</div>
    </mt-loadmore>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <!-- <Scenery/> -->
    <br/>
    <br/>
    <br/>
    <br/>
  </mt-tab-container-item>
</mt-tab-container>

  </div>

</template>

<script>
import Box from "../slot/Box.vue";
import Scenery from "./Scenery.vue";
export default {
  data() {
    return {
      selected: "1",
      localId:null,
      id:null,
      allLoaded:false,
      postListData:{
        start_num:1,
        rows:8
      },
      getListData:null,
      isShow:false
    };
  },
  created(){
    this.postData().then(data=>{
          let res =data.data.data.activityList
          this.getListData = res
          console.log('1res',res[0])
    })
  },
  methods:{
      //配合动态,请求封装成Promise
      postData(){
        let thz = this;
        let postListData = this.postListData
        return new Promise((resolve,reject)=>{
          //模拟 延迟2秒请求
          setTimeout(function(){
            resolve(thz.axio.post('he_live/getActivityList',postListData))
            thz.isShow = true
            },2000)
        })
      },
      loadTop() {
        let thz = this
        this.postListData={
            start_num:1,
            rows:8
        }
        this.postData().then(data=>{
          let res =data.data.data.activityList
          this.getListData = res
          thz.$refs.loadmore.onTopLoaded();
        })
      },
      loadBottom() {
        let thz = this
        this.postListData={
            start_num:1,
            rows:this.postListData.rows+5
        }
        this.postData().then(data=>{
          let res =data.data.data.activityList
          this.getListData = res
          this.$refs.loadmore.onBottomLoaded();
        })
        
      }

  },
  components: { Box, Scenery },
  mounted(){
  }
};
</script>

<style scoped lang='scss'>
.page-padding{
  // mt-navbar 高度 固定为46px
  padding-top: 46px;
}
.div{
  width: 10px;
  height: 1000px;
}
</style>