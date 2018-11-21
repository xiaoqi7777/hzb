<template>
   <div class="layout">

<mt-navbar fixed class="page-part" v-model="selected">
  <mt-tab-item id="1" >
    <div @click="btn1">
  		和直播
    </div>
	</mt-tab-item>
  <mt-tab-item id="2">
    <div @click="btn2">
		 实景
    </div>
	</mt-tab-item>
</mt-navbar>


<!-- tab-container -->
<mt-tab-container v-model="selected" class="page-padding" :auto-fill="autoFill"  v-if="!isSpinner">

  <mt-tab-container-item id="1">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
      <Box  v-for="(item,index) in getListData" :item='item' :key="index" />
      <!-- loadBottom  动态获取数据 初始化的时候 没有就会触发他 模拟一个假的高度够的放着-->
      <!-- <div v-if="!isShow" class="div">数据加载中...</div> -->
    </mt-loadmore>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <Scenery v-if="isShow"/>
  </mt-tab-container-item>
</mt-tab-container>

    <div class="spinner" v-if="isSpinner">
      <mt-spinner color="#26a2ff" :size=50 :type="3"></mt-spinner>
    </div>

  </div>

</template> 

<script>
import Box from "../livePlay/Box.vue";
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
        rows:5
      },
      getListData:null,
      isSpinner:true,
      autoFill:false,
      stopLoadData:false,
      //点击实景才加载
      isShow:true,
    };
  },
  created(){
    // this.selected = sessionStorage.getItem('selected')?sessionStorage.getItem('selected'):1
    this.postData().then(data=>{
          let res =data.data.data.activityList
          this.getListData = res
          // console.log(res,'--',this.getListData)
          this.isSpinner = false
          // if(this.getListData){alert('有数据',this.getListData)}
    })
    // this.selected = sessionStorage.getItem('selected')
  },
  methods:{
    btn1(){
      // sessionStorage.setItem('selected',1)
      // console.log('1')
    },
    btn2(){
      this.isShow = true
      // sessionStorage.setItem('selected',2)
      // console.log('2')
    },
      //配合动态,请求封装成Promise
      postData(){
        let thz = this;
        let postListData = this.postListData
        return new Promise((resolve,reject)=>{
          //模拟 延迟2秒请求
            resolve(thz.axio.post('he_live/getActivityList',postListData))
        })
      }, 
      loadTop() {
        let thz = this
        this.postListData={
            start_num:1,
            rows:3
        }
        this.postData().then(data=>{
          let res =data.data.data.activityList
          this.getListData = res
          thz.$refs.loadmore.onTopLoaded();
        })
      },
      loadBottom() {
        if(this.stopLoadData){
         this.allLoaded = true
        }
        let thz = this
        this.postListData={
            start_num:++this.postListData.start_num,
            rows:this.postListData.rows
        }
        this.postData().then(data=>{
          let res =data.data.data.activityList
          if(res.length === 0){
            this.stopLoadData = true
          }
          this.getListData.push(...res)
          this.$refs.loadmore.onBottomLoaded();
        })
        
      }

  },
  components: { Box, Scenery },
};
</script>

<style scoped lang='scss'>
.layout{
  height: 100%;
}
.spinner{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-padding{
  // mt-navbar 高度 固定为46px
  padding-top: 46px;
}
.div{
  width: 10px;
  height: 1000px;
}
</style>