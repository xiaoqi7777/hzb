<template>
		<article :class="$style.box"  @click="btn">
      <!-- #AEEEEE -->
        <section :class="$style.title_img">
          <div :class="$style.activePreview" v-if="status == 2">活动预告</div>
          <div :class="$style.active" v-if="status == 9">活动</div>
				  <img :class='$style.img' :src="item.coverUrl" alt="">
        </section>
		   	<BoxLine :item='item'>
          <template slot="time">
            <span :class='$style.time'>{{item.activityTime | formatDate}}</span> 
            <span :class='$style.number'>
                <span :class="$style.red">
                {{item.count}}
                </span> 
                参加
            </span>
          </template>
        </BoxLine>
		</article>
</template>

<script>  
import BoxLine from './BoxLine.vue'
export default {
  props:['item'],
  data(){
    return{
      status:null
    }
  },
  components:{
    BoxLine
  },
  mounted(){
    // this.status = this.item.status
    console.log('+++++++++-',this.item)
  },
  methods:{
    btn(){
      this.$router.push({
        path:'/index',
      	query:{
		      item:this.item
		    }
      })
    }
  }
};
</script>

<style module lang='scss'>
@import '../../assets/css/element.scss';
.box{
  @include list();
  @include panel();
  .title_img{
    height: 10rem;
    width: 100%;
    display: inline-block;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .number{
    margin-top: 2px;
    .red{
      color: red;
      font-weight: bold;
    }
  }
  .activePreview{
    display: inline-block;
    position: absolute;
    margin-top: 0.5rem;
    margin-left: calc(100% - 6rem);
    background-color: #AEEEEE;
    border-radius: 1rem;
    width: 5rem;
    height: 2rem;
    
    line-height: 30px;
    text-align: center;
    font-size: 12px
  }
  .active{
    display: inline-block;
    position: absolute;
    margin-top: 0.5rem;
    margin-left: calc(100% - 6rem);
    background-color: #98FB98;
    border-radius: 1rem;
    width: 5rem;
    height: 2rem;
    
    line-height: 30px;
    text-align: center;
    font-size: 12px
    }
}
</style>