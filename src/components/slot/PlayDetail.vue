<template>
    <div :class="$style.playDetail">
        <section :class="$style.top">
            <p>2018---------------</p>
            <p>观看人数</p>
        </section>
        <section :class="$style.mid">
            <p>时间</p>
            <p>主播</p>
            <p>观看:公开</p>
        </section>
        <section :class="$style.bottom">
            <p :class="$style.active"> 活动介绍</p>
            <p>2018--------------</p>
        </section>

    </div>
</template>

<script>
export default {};
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