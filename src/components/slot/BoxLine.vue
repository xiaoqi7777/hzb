<template>
    <section :class="$style.line">
        <div :class="$style.left_img">
        <img :class="$style.img" src="../../assets/img/logo.png" alt="">
        </div>
        <div :class="$style.left">
        <span :class="$style.title">jiangsu移动</span>
        <span :class="$style.note">微信公众号，直播开发中</span>
        </div>
        <div :class="$style.right">
          <slot name='time'>
          </slot>
          <slot name='star'>
          </slot>
<!--           
        <span :class='$style.time'>08-22 16:55</span>
        <span :class='$style.number'>
            <span :class="$style.red">100</span> 
            参加</span> -->
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style module lang='scss'>
@import "../../assets/css/element.scss";
.line {
  background: white;
  height: 4rem;
  @include list(row);
  justify-content: space-between;
  align-items: center;
  .left_img {
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    .img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .left {
    height: 100%;
    flex: 1;
    @include list();
    justify-content: center;
    .title {
      font-size: 12px;
      margin-bottom: 0.5rem;
    }
    .note {
      font-size: 12px;
      color: #b5b5b5;
    }
  }
  .right {
    height: 100%;
    width: 7rem;
    @include list();
    justify-content: center;
    align-items: center;
    .time {
      margin-bottom: 0.5rem;
      font-size: 14px;
    }
    .number {
      display: inline-block;
      font-size: 14px;
      .red {
        color: red;
      }
    }
  }
}
</style>