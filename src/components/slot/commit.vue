<template>
  <div :class="$style.block">
       <section :class="$style.left">
         <img :src="commitList.headUrl" alt="">
         <div :class="$style.main">
           <span :class="$style.name">{{commitList.userName}}</span>
           <span :class="$style.content">
            {{commitList.content}}
           </span>
         </div>
       </section>
       <section :class="$style.right">
         {{commitList.commentTime |formatDate }}
       </section>
  </div>
</template>

<script>
  export default {
    props:['commitList'],
    mounted(){
      console.log('聊天列表',this.commitList)
    },
    filters:{
        formatDate:function (val) {
          // let a = 2018 10 11/ 13/31/06
          let Y = val.substr(0,4)
          let M = val.substr(4,2)
          let d = val.substr(6,2)
          let h = val.substr(8,2)
          let m = val.substr(10,2)
          let s = val.substr(12,2)
          console.log(val,Y,M,d,h,m,s)
          return  `${M}-${d} ${h}:${m}`
        }
    }
  }
</script>

<style  module lang='scss'>
@import "../../assets/css/element.scss";
  .block{
    @include list(row);
    border-bottom: 0.5px solid gray;
    // &::after {
    //   @include line();
    //   margin: 0 10px;
    //   bottom: 0;
    //   border: 0.5px solid gray;
    // }
    padding:10px;
    .left{
      @include list(row);
      flex: 1;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 0  10px;
      }
      .main{
        flex: 1;
        @include list(column);
        .name{
          font-weight: bold;
          padding: 5px 0;
        }
        .content{
          width: 100%;
          margin-top: 10px;
          word-break :  break-all;
          overflow: hidden;
          line-height:1.5

        }
      }
    }
    .right{
      font-size: 14px;
      margin-top: 5px;
      margin-right: 5px;
    }
  }
</style>