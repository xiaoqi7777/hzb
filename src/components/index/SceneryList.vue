<template>
	<div :class="$style.SceneryList">
			<section :class="$style.title">
				<div :class="$style.img"> 
					<img src="../../assets/img/border.png" alt=""> 
					<span>{{item.groupName}}</span> 
				</div>
				<div :class="$style.more" @click="gengduo(item.groupId)">
					<span>更多></span>
				</div>
			</section>
			<section :class="$style.layout">
					<ThinIntroduce v-for="(value,index) in item.resourceInfos" :key='index' :item='value' :class="$style.flex"/>
					<div :class="$style.flex1"></div>
					<div :class="$style.flex1"></div>
			</section>
	</div>
</template>

<script>
import ThinIntroduce from '../scenery/ThinIntroduce.vue'
export default {
	props:['item'],
	components:{
		ThinIntroduce
	},
	methods:{
		getImgList(){
			let data = {
					"start_num":"1",
					"rows":"5",
					"groupId":"8o5jkcs0sd0m8ybb0d6ue70sjxjy61ub",
					"type":"1"
				}
		},
		gengduo(groupId){
			console.log('***********',groupId)
			// this.getImgList()
			this.$router.push({path:'/More',query:{	id:groupId}})
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
    flex-wrap:wrap;
		.flex{
			width: 50%
		}
		.flex1{
			width: 50%;
			height: 0;
			overflow: hidden;
		}
	}
}
</style>