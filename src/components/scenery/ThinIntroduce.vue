<template>
    <div :class='$style.introduce' id='123'>
        <div :class='$style.img' @click="btn(item)">
            <img :src="item.coverPath" alt="">
						<p :class='$style.number'>
								<span>观{{item.playCount}}</span>
								<span>赞{{item.praiseCount}}</span>
						</p>
         		<p :class="$style.title">{{item.name}}</p>
        </div>

    </div>
</template>

<script>
export default {
	props:['item'],
	methods:{
		btn(item){
			this.$router.push({
				path:'/sceneryPlayDetail',
				query:{
					item:this.item
					}
			})
		}
	}
};
</script>

<style module lang='scss'>
@import "../../assets/css/element.scss";
.introduce {
	display: inline-block;
	font-size: 0;
	@include list(column);
	align-items: center;
  .img {
	  	width: 10rem;
		position: relative;
    img {
      width: 100%;
	  height: 5rem;
		}
		.number {
			font-size: 14px;
			color: white;
			height: 1.5rem;
			line-height: 1.5rem;
			position: absolute;
			margin-top: -1.5rem;
			span{
				font-size: 12px;
			}
		}
		.title{
			font-size: 12px;
			height: 2rem;
			line-height: 2rem;
		}
	}
		
}
</style>