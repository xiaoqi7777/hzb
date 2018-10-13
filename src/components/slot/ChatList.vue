<template>
    <div :class="$style.chartList" ref="top">
          <div>
						<mt-navbar class="page-part" v-model="selected">
							<mt-tab-item id="1">
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
								<!-- <div class="div">12</div> -->
								<Commit :commitList='item' v-for="(item,index) in commitList" :key='index'/>
							</mt-tab-container-item>
							<mt-tab-container-item id="2">
								<PlayDetail :item='item'/>
							</mt-tab-container-item>
						</mt-tab-container>
					</div>
					<ul :class="$style.ul">
						<li>
							<img src="../../assets/img/ic_praise.png" alt="">
						</li>
						<li>
							<img src="../../assets/img/ic_gift.png"  alt="">
						</li>
						<li>
							<img src="../../assets/img/ic_question.png"  alt="">
						</li>
					</ul>
          <div :class="$style.inputTab" ref="inp">
						<input :class="$style.input" type="text" @focus="focus" v-model="content" placeholder="我来说两句">
						<Button :class="$style.btn" @click="submit">发送</Button>
					</div>
    </div>
</template>

<script>
import PlayDetail from './PlayDetail.vue'
import socketIo from "socket.io-client";
import Commit from '../component/commit.vue'
export default {
	data(){
		return{
			selected:'1',
			io: null,
			item:null,
			commitList:null,
			content:null
		}
	},
	methods:{
		focus(){
			// this.$refs.inp.style.position = 'fixed'
			let top = this.$refs.top
			let thz = this
			// thz.scrollIntoViewIfNeeded()	
			// window.scrollTo(0,10)
		},
		getCommitList(){
			let getCommit={
						"start_num":"1",
						"rows":"10",
						"resourceId":this.item.activityId
					}
			this.axio.post('he_live/getCommentList',getCommit)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						this.commitList = res.data.commentList
					}
				})
		},
		submit(){
			var openId = sessionStorage.getItem("openId");
			console.log('openId',openId)
			alert('openId=>',openId)
			let postCommit={
						"openId":openId,
						"resourceId":this.item.activityId,
						"content":this.content
					}
			this.axio.post('he_live/addComment',postCommit)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						this.content = ''
						this.getCommitList()
						alert('提交成功')
					}
				})
		}
	},
	created(){
		this.item = this.$route.query.item
		
		this.getCommitList()
		// console.log('this.item = this.$route.query.item',this.item)
		/**
1、本批的教学计划(带目录和时间对应) ----重点
2、在腾讯课程上，以往培训的每一期课程没有看到前端设计模式，性能监控，算法数据结构，面试技巧等  ----重点
3、现在常用的微信，支付宝等支付和第三方跳转会讲吗
4、宣传写的:自己手动实现一套前端框架全家桶并编写自己的项目脚手架 具体是啥  ----重点
5、react和vue后端渲染会原理和使用会嘛
6、react的讲解(网上写讲解原理，包括基础使用吗)，
		对应源码:会手写 实现关键的原理吗，
		RN是给视频学还是直播讲,要是视频学遇到问题咋办
7、一个月开一次 主讲老师就2个 按理来说一周同时带3个层级的班  咋安排的
8、项目训练，会讲什么样的(技术是前后端分离还是后端渲染模式)，做实践(涉及哪些技术的串联)
9、对于官网上的宣传，哪些是直播哪些是看录播
10、学完换工作，对于刚满一年工作(学懂90%情况下)，能具备什么样能力，有哪些绝对性的优势

		 */
		// this.io.on('send',data=>{
		// 	console.log('1111111',data)
		// })
	},
	components:{
		PlayDetail,
		Commit
	}
};
</script>
<style>
/*  */
/* .s1d{
	background: springgreen
} */
</style>

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