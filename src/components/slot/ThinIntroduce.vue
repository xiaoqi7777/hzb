<template>
    <div :class='$style.introduce' id='123'>
        <div :class='$style.img' >
            <img src="../../assets/img/timg.jpg" alt="">
						<p :class='$style.number'>
								<span>观看人数</span>
								<span>点赞人数</span>
						</p>
         		<p :class="$style.title">拙政园</p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style module lang='scss'>
@import "../../assets/css/element.scss";
.introduce {
	display: inline-block;
	font-size: 0;
	@include list(column);
	align-items: center;
  .img {
	  	width: 25vh;
		position: relative;
    img {
      width: 100%;
      height: 100%;
		}
		.number {
			font-size: 14px;
			color: white;
			height: 1.5rem;
			line-height: 1.5rem;
			position: absolute;
			margin-top: -1.5rem;
		}
		.title{
			font-size: 14px;
			height: 2rem;
			line-height: 2rem;
		}
	}
		
}
</style>