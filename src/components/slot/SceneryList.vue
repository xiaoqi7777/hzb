<template>
	<div :class="$style.SceneryList">
			<section :class="$style.title">
				<div :class="$style.img"> 
					<img src="../../assets/img/border.png" alt=""> 
					<span>美丽南京</span> 
				</div>
				<div :class="$style.more" @click="gengduo">
					<span>更多></span>
				</div>
			</section>
			<section :class="$style.layout">
					<ThinIntroduce :class="$style.flex"/>
					<ThinIntroduce :class="$style.flex"/>
			</section>


	</div>
</template>

<script>
import ThinIntroduce from './ThinIntroduce.vue'
export default {
	components:{
		ThinIntroduce
	},
	methods:{
		gengduo(){
			this.$router.push({path:'/More'})
		}
	}
};
</script>

<style lang='scss' module>
@import "../../assets/css/element.scss";
.SceneryList{
	background: white;
	.title{
		height: 3rem;
		line-height: 3rem;
		@include list(row);
		justify-content: space-between;
		align-items: flex-end;
		.img{
			@include list(row);
			justify-content: center;
			align-items: center;
			margin-left: 0.6rem;
			img{
				width: 3px;
				height: 1rem;	
				margin-right: 0.4rem;
			}
		}
		.more{
			color: green;
			margin-right: 0.5rem;
		}
	}
	.layout{
		@include list(row);
		.flex{
			flex: 1
		}
	}
}
</style>