<template>
    <div :class="$style.chartList" ref="top" >
          <div>
						<mt-navbar class="page-part" v-model="selected">
							<mt-tab-item id="1" >
								评论
							</mt-tab-item>
							<mt-tab-item id="2">
								详情
							</mt-tab-item>
						</mt-navbar>
					</div>

          <div  :class="$style.chatTab">
						<mt-tab-container v-model="selected"  class="parentHeight">
							<mt-tab-container-item id="1" >
								<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
									<Commit :commitList='item' v-for="(item,index) in commitList" :key='index'/>
								</mt-loadmore>
							</mt-tab-container-item>
							<mt-tab-container-item id="2">
								<MovieDetail :item='item'/>
							</mt-tab-container-item>
						</mt-tab-container>
					</div>

					<ul :class="$style.ul" v-show="!isShow">
						<li>
							<img src="../../assets/img/ic_praise.png" alt="">
						</li>
						<li @click="showPresent">
							<img src="../../assets/img/ic_gift.png"  alt="">
						</li>
						<!-- <li>
							<img src="../../assets/img/ic_question.png"  alt="">
						</li> -->
					</ul>
          <div :class="$style.inputTab" ref="inp">
						<input :class="$style.input" type="text" @focus="focus" v-model="content" placeholder="我来说两句">
						<Button :class="$style.btn" @click="submit">发送</Button>
					</div>
					<Present :parentInfo='parentInfo' class="isShow" v-show="isShow"/>
    </div>
</template>

<script>
import MovieDetail from '../slot/movieDetail.vue'
import socketIo from "socket.io-client";
import Commit from '../slot/commit.vue';
import Present from '../slot/present.vue';
import Brother from '@/utils/brother';
export default {
	data(){
		return{
			selected:'1',
			io: null,
			item:null,
			commitList:null,
			content:null,
			isShow:false,
			parentInfo:null,
			openId:null,
			allLoaded:false,
			getCommit:{
				"start_num":"1",
				"rows":"5",
			},
			stopLoadData:false
		}
	},
	methods:{
		showPresent(e){ 
			e.stopPropagation()
			this.isShow = true
		},
		// btnShow(e){
		// 	let dom = e.target
		// 		if(!dom.matches('.isShow')){
		// 			this.isShow = false
		// 		}
		// },
		loadTop(){
			this.getCommit.start_num = 1
			this.getCommitList()
  		this.$refs.loadmore.onTopLoaded();
		},
		loadBottom(){
			if(this.stopLoadData){
				this.allLoaded = true;
			}
			this.getCommit.start_num++
			this.getCommitList()
		  this.$refs.loadmore.onBottomLoaded();
		},
		focus(e){
			e.stopPropagation()
			let top = this.$refs.top
			let thz = this
		},
		getCommitList(){
			let getCommit={
						"resourceId":this.item.resourceId?this.item.resourceId:this.item.activityId,
						...this.getCommit
					}
			this.axio.post('he_live/getCommentList',getCommit)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						if(res.data.commentList.length === 0){
							this.stopLoadData = true
						}
						if(this.getCommit.start_num == 1){
							this.commitList = res.data.commentList
						}else{
							this.commitList.push(...res.data.commentList)
						}
						console.log('聊天的数据-----------',this.commitList)
					}
				})
		},
		submit(e){
			e.stopPropagation()
			console.log('openId',this.openId)
			if(!this.content){
				alert('请输入内容')
				return
			}
			if(!this.openId){
				alert('请关注和直播')
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e9e12bcd5027906&redirect_uri=${encodeURI('http://tsml520.cn/index.html')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
				return
			}
			let postCommit={
						"openId":this.openId,
						"resourceId":this.item.resourceId?this.item.resourceId:this.item.activityId,
						"content":this.content
					}
			this.axio.post('he_live/addComment',postCommit)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						this.content = ''
						this.getCommitList()
						console.log('提交成功')
					}
				})
		}
	},
	mounted(){
			this.openId = localStorage.getItem("openId");
			console.log('openId++++++',this.openId)
			this.parentInfo = this.$refs.top

	},
	created(){
		this.item = this.$route.query.item
		console.log('it---------------em',this.item)
		this.getCommitList()
		Brother.$on('isShow',(data)=>{
			this.isShow = data
		})
		// console.log('this.item = this.$route.query.item',this.item)
		// this.io.on('send',data=>{
		// 	console.log('1111111',data)
		// })
	},
	components:{
		MovieDetail,
		Commit,
		Present
	}
};
</script>


<style module lang='scss'>
@import "../../assets/css/element.scss";
.chartList {
	@include list();
	.chatTab{
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		background: white;
		flex: 1;
		overflow: scroll;
	}
  .inputTab {
		height: 50px;
		background: white;
		@include list(row);
		align-items: center;
		justify-content: space-between;
		.input{
			padding: 10px;
			border: 1px solid gray;
			border-radius: 10px;
			flex: 1;
			margin-right: 10px;
			margin-left: 10px;
		}
		.btn{
			margin-right: 10px;
		}
  }
	.ul{
		position: fixed;
		right: 20px;
		bottom: 60px;
		li{
			margin-bottom: 10px;
			width: 30px;
			height: 30px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>