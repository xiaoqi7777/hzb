<template>
  <div :class="$style.layout" @click="stopBtn" ref="layout">
    <ul :class="$style.ul" id="ul">
          <div @click="img('dom1')" ref="dom1" :class="$style.img">
            <img  src="@/assets/img/gift_praise.png" alt="">
          </div> 

          <div @click="img('dom2')" ref="dom2" :class="$style.img">
            <img src="@/assets/img/gift_red_packet.png" alt="">
          </div>
          
          <div @click="img('dom3')"  ref="dom3"  :class="$style.img">
            <img src="@/assets/img/gift_follower.png" alt="">
          </div>
          
          <div @click="img('dom4')" ref="dom4"  :class="$style.img">
            <img src="@/assets/img/gift_gold.png" alt="">
          </div>
          
          <div @click="img('dom5')"  ref="dom5" :class="$style.img">
            <img src="@/assets/img/gift_ice.png" alt="">
          </div>
       <div @click="btn" :class="$style.img" ><img src="@/assets/img/ic_gift_send.png" alt=""></div>

          <transition
            name='fade'
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            v-bind:css="true"
          >
            <div v-show="show" class="addcart-mask">
              <img  class="ball mask-item" :src="ball" alt="" width="30">
            </div>
          </transition>
    </ul>
  </div>
</template>

<script>
import Brother from '@/utils/brother';
  export default {
    props:['parentInfo'],
    data(){
      return{
        show: false,
        isBtn:true,
        ball: 'https://upload-images.jianshu.io/upload_images/1864602-ec73f549171a6601.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        x:null,
        y:null,
        bg:null,
        bged:null,
      }
    },
    // mounted(){
    //   console.log(this.height)
    // },
    methods:{
      img(dom){
        let target = this.$refs[dom]

        if(this.bged){
          this.bged.style.background = ''
        }
        target.style.background = 'springgreen'
        this.bged = target 

        let targetInfo = target.getBoundingClientRect()
        console.log(targetInfo.top )

        this.x = targetInfo.left + targetInfo.width/2
        this.y = targetInfo.top + targetInfo.height/2 
        this.ball = target.children[0].src
        console.log(this.x,this.y)
      },
      btn(){
        console.log(this.sd)
        if(this.isBtn){
          console.log('点击此时')
          this.isBtn = false
          this.show = !this.show
        }   
      },
      beforeEnter(el){
          //小球初始化 位子
          let ball = document.getElementsByClassName('mask-item')[0]
          ball.style.transform = `translate3d(0,0,0)`
          console.log(this.x,this.y,el.style.top,el.style.left)
           let x = this.x
           //现在相对的不是顶端 当前组件(设置了position)
           let y = this.y - (window.innerHeight-this.$refs.layout.offsetHeight)
            el.style.left = x+'px'
            el.style.top = y+'px'

          el.style.transform = `translate3d(0,0,0)`
          ball.style.transform = `translate3d(0,0,0)`
      },
      enter(el){
          //小球运动 位子
          let ball = document.getElementsByClassName('mask-item')[0]
          //重排重绘
          el.offsetWidth;
          //
          let domX  = 20
          let domY  =  window.innerHeight - this.parentInfo.getBoundingClientRect().height - 50
          let x = this.x - domX
          let y = this.y - domY


          el.style.transform = `translate3d(0,-${y}px,0)`
          ball.style.transform = `translate3d(-${x}px,0,0) rotateZ(270deg) `
          
          // ball.style.background = 'blue'
          console.log('进入时候', window.innerHeight ,this.parentInfo.getBoundingClientRect().height,domY)
      },
      afterEnter(){
        this.isBtn = true
        this.show = false
        console.log('动画完成后')
      },
      stopBtn(e){
        e.stopPropagation()
      },
      send(){
        //  this.show = false
      }
    }
  }
</script>
<style>
.fade-enter-active{
 transition: 2s cubic-bezier(.17,.67,.62,1.05);
}
.fade-enter-active .mask-item{
 transition: 2s cubic-bezier(0,0,0,0)
}
.addcart-mask{
  position: absolute;
  left: 0;
  top: 0
}
</style>


<style module lang="scss">
.layout{
  width: 100%;
  // opacity: 0.7;
  background: rgba(0,0,0,0.7);
  // background: black;
  position: fixed;
  bottom: 0;
  .ul{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between ;
    align-items: center;
    align-content:space-around;
    .img{
      width: 33.33%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width:40%;
        height: 40%;
      }
    }
  }
}
</style>