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
    }
  }
</script>

<style  module lang='scss'>
@import "../../assets/css/element.scss";
  .block{
    @include list(row);
    border-bottom: 0.5px solid gray;
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