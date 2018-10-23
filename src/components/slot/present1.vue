<template>
  <div :class="$style.layout" @click="stopBtn">
    <ul :class="$style.ul" id="ul">
          <div>
            <img src="@/assets/img/ic_gift.png" alt="">
          </div> 

          <div class="dom">
            <img src="@/assets/img/ic_gift.png" alt="">
          </div>
       <div @click="send"><img src="@/assets/img/ic_gift_send.png" alt=""></div>
    </ul>

  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
        stopBtn(e){
          e.stopPropagation()
        },
        send(){
              let div = document.createElement('div')
                  div.classList.add('div1')
              let img = document.createElement('img')
                  img.src = 'http://img3.imgtn.bdimg.com/it/u=2200166214,500725521&fm=26&gp=0.jpg'
                  img.classList.add('div2')
                  div.appendChild(img)
              let targetDom = document.querySelector('.dom')
              let ulDom = document.querySelector('#ul')
              ulDom.insertBefore(div,targetDom)
              // console.log('111',ulDom)
              // console.log('222',div)

          		let dom1 = document.querySelector('.div1')
              let dom2 = document.querySelector('.div2')
              
              dom1.style.transform = `translateX(${200}px) `
              dom2.style.transform = `translateY(${-200}px) rotateX(${360}deg) `
              
        }
    }
  }
</script>
<style>
		.div1,.div2{
      width: 50px;
			height: 50px;
      transition: 2s;
		}
		.div2 {
			transition-timing-function: cubic-bezier(.18, .64, .6, 1.49);
		}

		.div1 {
			transition-timing-function: linear;
			/* transition-timing-function: cubic-bezier(.18, .64, .6, 1.49); */
		}
</style>

<style module lang="scss">
.layout{
  width: 100%;
  height: 300px;
  // opacity: 0.5;
  background: burlywood;
  position: fixed;
  bottom: 0;
  .ul{
    display: flex;
  }
}
</style>