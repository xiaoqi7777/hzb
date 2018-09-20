<template>
   <div >

<mt-navbar class="page-part" v-model="selected">
  <mt-tab-item id="1">
		和直播
	</mt-tab-item>
  <mt-tab-item id="2">
		 实景
	</mt-tab-item>
</mt-navbar>


<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <Box/>
    <Box/>
    <Box/>
    <Box/>
    <Box/>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <!-- <Scenery/> -->
    <div @click="btn1"> 开启录制 </div>
    <div @click="btn2"> 停止录制 </div>

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
      selected: "1"
    };
  },
  methods:{
    btn1(){
      wx.startRecord();
    },
    btn2(){
      wx.stopRecord({
        success: function (res) {
        var localId = res.localId;
        }
      });
    }
  },
  components: { Box, Scenery },
  mounted(){
    console.log('进来了')
    this.axio.get('/').then(data=>{
      let res = data.data
      console.log('signature',res.signature)
      wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx3df629936bf31f75', // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名
          jsApiList: [               
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'translateVoice'
                ] // 必填，需要使用的JS接口列表
      })
      wx.ready(function(){
          wx.checkJsApi({
              jsApiList: [
                'startRecord'
                ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                  console.log('成功获取res',res)
              }
          });
      });
      wx.error(function(res){
        console.log('失败',res)
      });
    })
  }
};
</script>

<style scoped lang='scss'>
.tt {
  .ti {
    color: red;
    // width:1rem;
  }
}
.test {
  background: red;
  width: 100px;
  height: 100px;
}
</style>