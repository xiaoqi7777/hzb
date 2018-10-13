<template>
    <div :class="$style.playDetail">
        <section :class="$style.top">
            <p>{{item.activityDesc}}</p>
            <p>观看人数{{item.count}}</p>

        </section>
        <section :class="$style.mid">
            <p>时间{{item.activityTime}}</p>
            <p>主播:{{item.userName}}</p>
            <p>观看:公开</p>
        </section>
        <section :class="$style.bottom">
            <p :class="$style.active"> 活动介绍</p>
            <p>{{item.activityDesc}}</p>

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
  }
  .mid {
    position: relative;
    height: 5rem;
    @include list(column);
    &::after {
      @include line();
      bottom: 0;
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
        bottom: 0;
      }
    }
  }
}
</style>