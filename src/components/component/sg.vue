<template>
  <div id="div" >
      <div class="div1" id="div1">
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>

        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>

        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
          <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>

        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>

        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
                <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">发送：123123</div>
        <div class="div12">回复123123---------------</div>
      </div>
      <div class="btn">
        <label for="div">
          请输入
        </label>
        <input @focus="on" @input="inp" @blur="zou" type="text" id="div" class="div2">
        <div class="div3" @click="btn">
            发送{{value}} 高度{{gaodu}}
        </div>
      </div>
      
  </div>
</template>

<script>
  export default {
    data(){
      return{
        yheight:null,
        value:null,
        gaodu:0
      }
    },
    methods:{
      inp(){  
          this.value = window.pageYOffset
      },
      on(){
        // 原始屏幕 高度 window.innerHeight
        //  输入法起来 时候 在调  window.innerHeight
        // let dom = document.querySelector('.div1')
        // let div = document.querySelector('#div')
        // div.scrollIntoView()

        // let btn = document.querySelector('.btn')
        // btn.style.position = 'absolute'
        // btn.style.top = '10'+'px'
        //弹框 = 原生高减掉现在高度
        // setTimeout(()=>{
        //   let height = this.yheight - window.innerHeight
        //   alert(height)
        // },1000)
      },
      zou(){
        // let dom = document.querySelector('.div1')
        // let btn = document.querySelector('.btn')
        // btn.style.position = 'relative'

      },
      btn(){
        // let dom = document.querySelector('.div1')

          // 整个屏幕 622
          // 输入法起来 的屏幕 306
          // alert(dom.clientHeight)
          // let height = this.yheight - window.innerHeight
          // alert(this.yheight,window.innerHeight)
          // alert(window.innerHeight)
        this.gaodu = window.innerHeight
      }
    },  
    updated(){
      console.log('1231111s12211s')
    },
    mounted(){
      this.yheight = window.innerHeight
        // let div = document.querySelector('#div')
      // window.onscroll = ()=>{
          // this.gaodu = window.innerHeight
          // let btn = document.querySelector('.btn')
          // btn.style.position = 'absolute'
          // btn.style.top = this.gaodu +'px'
      // }
      // let dom = document.querySelector('.div1') 

      // setTimeout(() => {
      //   document.getElementById("div1").scrollIntoView(false);
      // }, 1000);
    }
  }
</script>

<style scoped>
.btn{
  position: fixed;
  bottom: 100px;
  top: 100px;

}
  .div{
    /* position: fixed; */
    /* height: 600px;
    overflow:scroll */
  }
  .div11{
    height: 100px;
  }
  .div12{
    /* position: fixed */
  }
  .div2{
    height: 30px;
  }
  .div3{
    display: inline-block
  }
</style>