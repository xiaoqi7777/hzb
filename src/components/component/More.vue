<template>
  <div :class='$style.more'>
    <section>
      <img src="../../assets/img/timg.jpg" alt="">
    </section>
    <mt-loadmore  :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div :class="$style.load">
          <ThinIntroduce :class="$style.flex"/>
          <ThinIntroduce :class="$style.flex"/>
          <ThinIntroduce :class="$style.flex"/>
          <ThinIntroduce :class="$style.flex"/>
          <ThinIntroduce :class="$style.flex"/>
          <div :class="$style.div"></div>
          <div :class="$style.div"></div>

      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import ThinIntroduce from '../slot/ThinIntroduce'
  export default {
    data(){
      return{
        allLoaded:false
      }
    },
    components:{
      ThinIntroduce
    },
    methods:{
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        // this.allLoaded = true;// 若数据已全部获取完毕
        // this.$refs.loadmore.onBottomLoaded();
      }
    }
  }
</script>


<style lang='scss' module>
@import '../../assets/css/element.scss';
.more{
  img{
    width: 100%;
    height: 200px;
  }
  .load{
    @include list(row);
    justify-content: space-around;
    .div{
      width: 50%;
    }
    .flex{
      // flex: 1
    }

  }
}
</style>