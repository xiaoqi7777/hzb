<template>
    <div :class="$style.playDetail">
        <section :class="$style.top">
            <p :class="$style.title">{{item.activityDesc?item.activityDesc:item.content}}</p>
            <p :class="$style.span">观者{{item.count?item.count:item.playCount}}</p>
        </section>
        <section :class="$style.mid">
            <p :class="$style.center">时间{{item.activityTime?item.activityTime:item.lastDate}}</p>
            <p :class="$style.center">主播:{{item.userName?item.userName:item.name}}</p>
            <p :class="$style.center">观看:公开</p>
        </section>
        <section :class="$style.bottom">
            <p :class="$style.active"> 活动介绍</p>
            <p :class="$style.span">{{item.activityDesc?item.activityDesc:item.content}}</p>
        </section>
    </div>
</template>
 
<script>
export default {
  props:['item'],
  mounted(){
    console.log('播放详情',this.item)
  }
};
</script>

<style lang='scss' module>
@import "../../assets/css/element.scss";
.playDetail {
  .top {
    position: relative;
    height: 3rem;
    @include list(column);
    &::after {
      @include line();
      bottom: 0;
    }
    .span{
      font-size: 12px;
    }
  }

  .mid {
    position: relative;
    height: 5rem;
    @include list(column);
    &::after {
      @include line();
      bottom: 0;
    }
    .center{
      font-size: 14px;
      line-height: 16px;
    }
  }
  .bottom {
    .active {
      position: relative;
      height: 3rem;
      @include list(column);
      justify-content: flex-end;
      &::after {
        @include line();
        bottom: -5px;
      }
    };
    .span{
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>