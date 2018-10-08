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
    <br/>
    <br/>
    <br/>
    <br/>
    <div class="div1" @click="btn1"> 开启录制 </div> <span @click="btn11">相机</span>
        <br/>
    <br/>
    <br/>
    <br/>
    <div  class="div1" @click="btn2"> 停止录制 </div> <span @click="btn22">照片预览</span>
        <br/>
    <br/>
    <br/>
    <br/>
    <div  class="div1" @click="btn3"> 播放语言 </div>
      <br/>
    <br/>
    <br/>
    <br/>
    <div  class="div1" @click="btn4"> 上报语音 </div>

          <br/>
    <br/>
    <br/>
    <br/>
      <input v-model="id" placeholder="输入下载ID"><span @click="btn5">下载语音</span>
                <br/>
    <br/>
    <br/>
    <br/>
    <div  class="div1" @click="btn6"> 分享 </div>
    <div class="divImg">
      <img :src="src" alt="">
    </div>
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
      src:null,
      id:null,
      openId:null
    };
  },
  created(){
    console.log('123',this.$route.fullPath)
    /*
      1、分享的时候 截取 openid 
          没有
    */
    // let str= location.href
    // if(this.openId){
    //   if(str.indexOf('code=')>-1){
    //     return;
    //   }else{
    //     location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3df629936bf31f75&redirect_uri=${encodeURI('http://tsml520.cn/wx/he_live')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    //   }
    // }else{
    //     axios.get('/openId').then(data=>{
    //       this.openId = data.openId
    //     })
    // }
    // let str= location.href

      // if(str.indexOf('code=')>-1){
      //     console.log('进去了')
      // } else{
      //   location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3df629936bf31f75&redirect_uri=${encodeURI('http://tsml520.cn/index.html')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      // }

},
  methods:{
        GetQueryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(unescape(r[2]))
        return null
      },  
    btn5(){
      let that = this
      wx.downloadVoice({
        serverId: that.id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          that.localId = res.localId; // 返回音频的本地ID
          alert('下载成功')
        }
      });
    },
    btn11(){
      let that = this
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
           that.src = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
      });
    },
    btn22(){
      let that = this
      wx.previewImage({
        current: that.src, // 当前显示图片的http链接
        urls: [that.src]
      });
    },
    btn6(){


    //   wx.updateAppMessageShareData({ 
    //         title: '分享标题', // 分享标题
    //         desc: '分享描述------------分享描述-----------分享描述--------分享描述', // 分享描述
    //         link: 'http://www.tsml520.cn:5000', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1588799093,979234084&fm=58&bpow=500&bpoh=500', // 分享图标
    // }, function(res) { 
    //   alert('分享 成功了')
    // }); 
    },
    btn1(){
      wx.startRecord();
    },
    btn2(){
      let that = this
      wx.stopRecord({
        success: function (res) {
        var localId = res.localId;
        that.localId = localId
        console.log('停止录制ID',that.localId)
        }
      });
    },
    btn3(){
      let that = this
      wx.playVoice({
        localId: this.localId, // 需要播放的音频的本地ID，由stopRecord接口获得
       success: function (res) {
          console.log('-------',that.localId)
        }
     });
    },
    btn4(){
      let that = this
      wx.uploadVoice({
        localId: that.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var serverId = res.serverId; // 返回音频的服务器端ID
          that.axio.post('/data',{data:serverId})
            .then(data=>{
              console.log('发送成功',data)
            })
          console.log('语音上报成功',res)
        }
      });
    }
  },
  components: { Box, Scenery },
  mounted(){
    console.log('进来了')
    this.axio('/wx/he_live').then(data=>{console.log('1',data)})
    let url = location.href 
    this.axio.get(`/sdk/?url=${url}`).then(data=>{
      let res = data.data
      console.log('signature',res.signature)
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx3df629936bf31f75', // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名
          jsApiList: [               
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'translateVoice',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'chooseImage',
                'previewImage',
                'downloadVoice',
                'updateAppMessageShareData',
                'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表
      })
      wx.ready(function(){
          wx.onMenuShareAppMessage({
            title: '分享标题', // 分享标题
            desc: '分享描述', // 分享描述
            link: 'http://tsml520.cn:5000', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1588799093,979234084&fm=58&bpow=500&bpoh=500', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            // 用户点击了分享后执行的回调函数 
            alert('成功------------')
            }
          });
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
.div1{
  display: inline-block
}
.divImg{
  width: 100%;
}
.divImg img{
  width: 100%;
}
</style>