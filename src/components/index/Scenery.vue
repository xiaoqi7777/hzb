<template>
    <div :class="$style.Scenery">
        <section :class="$style.swipe">
            <mt-swipe :auto="4000" >
						<mt-swipe-item v-for="(item,index) in imgList" :key="index">
							<img :class="$style.img" :src="item.coverPath" alt="">
						</mt-swipe-item>
					</mt-swipe>
        </section>
				<SceneryList v-for="(item,index) in playList" :key="index" :item='item' :class="$style.thin">
				</SceneryList>
    </div>
</template>

<script>
import SceneryList from "./SceneryList.vue";
export default {
	data(){
		return{
			imgList:[],
			playList:[]
		}
	},
  	components: {
    	SceneryList
	},
	methods:{
		//获取轮播图
		getImg(){
			let data = {
				"start_num":"1",
				"rows":"6",
				"groupId":"",
				"type":"1"
			}
			this.axio.post('he_live/getSceneList',data)
				.then(data=>{
					this.imgList = data.data.data.resourceList
				})
		},
		getPlayList(){
			let data = {
					"start_num":"1",
					"rows":"10"
			}
			this.axio.post('he_live/getSceneGroupListWith2',data)
				.then(data=>{
					this.playList = data.data.data.resourceGroupInfos
					// console.log(data)
				})
		}

	},
	created(){
		this.getImg()
		this.getPlayList()
	}
};
</script>

<style lang='scss' module>
.Scenery {
	background:#E0E0E0;
  .swipe {
    height: 200px;
		.img{
			width: 100%
		}
	}
	.thin{
		margin-top: 10px;
	}
	
}
</style>