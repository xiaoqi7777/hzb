<template>
    <div id="wx-index-wrap">
        <!--<mt-header title="二维码/条码" fixed>-->
            <!--<mt-button slot="left" icon="back"></mt-button>-->
        <!--</mt-header>-->
        <router-view></router-view>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: '',
    data () {
      return {
        url: false
      }
    },
    created () {
      let url = ['/wx?reportProblemList']
      if (url.indexOf(this.$route.fullPath) !== -1) {
        this.url = true
      }
      this.getOpenId()
    },
    methods: {
      // 获取openId-获取到之后调用isIn判断用户是否已经有账户
      GetQueryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(unescape(r[2]))
        return null
      },
      // 获取openid，判断openid是否在企业中。true：跳转首页，false：进行扫码注册。
      getOpenId () {
        let self = this
        // 如果当前路由不为微信需要验证的首页则不进行获取openid的操作等等。
        if (this.$route.path !== '/wx') {
          return
        }
        let openid = localStorage.getItem('openId')
        // 如果不存在openid，则检查code是否存在
        if (!openid || openid === undefined || openid === null || openid === 'undefined') {
          let code = this.GetQueryString('code')
          if (!code) {
            // 不存在code则重定向到微信链接获取
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdaa27451e5683ba5&redirect_uri=http%3a%2f%2fwww.sinboun.com%2fdist%2findex.html&response_type=code&scope=snsapi_userinfo&state=wechat_niushuji#wechat_redirect'
          } else {
            // 存在code，获取openid
            self.$http('post', 'wechat/getOpenid', {}, {code: code}, true).then((res) => {
              let mid = res.body || res.body.openid
              sessionStorage.setItem('openid', mid)
              if (self.url) {
                // self.$router.push('/wx/reportProblemList')
                self.regesiterProblem()
              } else {
                self.regesiter()
              }
//              self.isIn(localStorage.getItem('openId'))
            })
          }
        } else {
          if (self.url) {
            self.regesiterProblem()
          } else {
            self.regesiter()
          }
//          self.isIn(localStorage.getItem('openId'))
        }
      },
      // 进行jssdk接入验证
      regesiter () {
        let self = this
        this.$http('post', 'wechat/getsignature', {}, {url: 'http://www.sinboun.com/dist/index.html'}, true).then((res) => {
          if (parseFloat(res.code) === 0) {
            window.wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.body.appId, // 必填，公众号的唯一标识
              timestamp: res.body.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.body.noncestr, // 必填，生成签名的随机串
              signature: res.body.signature, // 必填，签名
              jsApiList: ['chooseImage', 'scanQRCode', 'previewImage', 'getLocalImgData', 'startRecord', 'onVoiceRecordEnd', 'translateVoice', 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表
            })
            window.wx.ready(function () {
              self.isIn()
            })
            window.wx.error(function (res) {
              Toast({
                message: '验证失败请重试',
                position: 'middle',
                duration: 1000
              })
              window.wx.closeWindow()
            })
          }
        })
      },
      regesiterProblem () {
        let self = this
        this.$http('post', 'wechat/getsignature', {}, {url: 'http://www.sinboun.com/dist/index.html'}, true).then((res) => {
          if (parseFloat(res.code) === 0) {
            window.wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.body.appId, // 必填，公众号的唯一标识
              timestamp: res.body.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.body.noncestr, // 必填，生成签名的随机串
              signature: res.body.signature, // 必填，签名
              jsApiList: ['chooseImage', 'scanQRCode', 'previewImage', 'getLocalImgData', 'startRecord', 'onVoiceRecordEnd', 'translateVoice', 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表
            })
            window.wx.ready(function () {
              self.$router.push('/wx/reportProblemList')
            })
            window.wx.error(function (res) {
              Toast({
                message: '验证失败请重试',
                position: 'middle',
                duration: 1000
              })
              window.wx.closeWindow()
            })
          }
        })
      },
      // 微信扫码功能--跳转到注册页面进行注册
      getCode () {
        let self = this
        window.wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            // alert('二维码扫描结果是' + result)
            let param = result.substring(4)
            if (result.indexOf('dsy@') !== -1) {
              self.$router.push({path: '/wx/login', query: {id: param}})
            } else {
              Toast('该二维码不符合规则!')
            }
          },
          cancel: function (res) {
            // console.log('取消扫一扫')
            window.wx.closeWindow()
          }
        })
      },
      // 判断当前的openId是否已经做了关联-是：直接跳转到首页，否：进行扫码注册
      isIn () {
        let code = localStorage.getItem('openId')
        let self = this
        this.$http('post', 'wechat/getUserInfoByOpenid', {}, {openid: code}).then((res) => {
          if (String(res.code) === '500') {
            self.getCode()
          } else {
            self.$router.push('/wx/pageIndex')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
