<template>
  <div id="app">
    <!-- <div v-if="isShow"> -->
      {{cs}}
    <!-- </div> -->
    <!-- <router-view v-if="isShow"/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      isShow:false,
      code:null,
      cs:12333333
    }
  },
  created(){
    let str= location.href
    let openId = sessionStorage.getItem('openId')
    //openId不存在
    if(!openId){
        if(str.indexOf('code=')>-1){
          this.cs = '有code值+++++++++++'
          this.isShow = true
          console.log('不搞事情',str)
          let url = location.href
          let start = url.indexOf('code=')+5
          let end = url.indexOf('&state')
          this.code = url.slice(start,end)
          this.axio.get(`http://tsml520.cn/wx/he_live?code=${this.code}`).then(data=>{
            sessionStorage.clear()
            sessionStorage.setItem("openId",data.data.openid)
            console.log('code发送成功,获取到的openId',data.data.openid)
          })
        } else{
          // location.href = 'http://www.baidu.com'
          this.cs = '么有code值-----------'
          this.isShow = false
          // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3df629936bf31f75&redirect_uri=${encodeURI('http://tsml520.cn/index.html')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e9e12bcd5027906&redirect_uri=${encodeURI('http://tsml520.cn/index.html')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        }


    }else{
      //正常渲染
      console.log('正常渲染')
    }
    //判断code值
    
    //截取code值
      

    // this.axio.get(`/sdk/?url=${url}`).then(data=>{
    this.axio.get(`/wx_web/get_signature/?url=${url}`).then(data=>{
      let res = data.data
      console.log('signature',res)
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          // appId: 'wx3df629936bf31f75', // 必填，公众号的唯一标识
          appId: 'wx6e9e12bcd5027906', // 必填，公众号的唯一标识
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
                link: 'http://tsml520.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1588799093,979234084&fm=58&bpow=500&bpoh=500', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              alert('alert----新的')
            // 用户点击了分享后执行的回调函数
            }
            
        });
            wx.updateAppMessageShareData({ 
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: 'http://tsml520.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1588799093,979234084&fm=58&bpow=500&bpoh=500', // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
              }, function(res) { 
                  console.log('成功------------updateAppMessageShareData')
              //这里是回调函数 
              }); 
              wx.updateTimelineShareData({ 
                      title: '', // 分享标题
                      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: '', // 分享图标
              }, function(res) { 
                          console.log('成功------------updateTimelineShareData')

              }); 
          wx.checkJsApi({
              jsApiList: [
                'startRecord',
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'onMenuShareAppMessage'
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
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
}
</style>
