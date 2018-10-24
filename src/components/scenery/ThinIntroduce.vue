<template>
    <div :class='$style.introduce' id='123'>
        <div :class='$style.img' @click="btn(item)">
            <img :src="item.coverPath" alt="">
						<p :class='$style.number'>
								<span :class='$style.spanLeft'><img src="@/assets/img/guankan_times.png" alt="" >{{item.playCount}}</span>
								<span :class='$style.spanRight'><img src="@/assets/img/btn_not_praise.png" alt="" >{{item.praiseCount}}</span>
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
			width: 100%;
			.spanLeft{
				font-size: 12px;
				margin-left: 30px ;
				img{
					position: absolute;
					left: 3px;
					top: 5px;
					width: 25px;
					height: 15px;
				}
			}
			.spanRight{
				float: right;
				right: 10px;
				font-size: 12px;
				margin-left: 30px ;
				position: relative;
				img{
					position: absolute;
					left: -25px;
					top: 0px;
					width: 25px;
					height: 20px;
				}
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