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
							<img @click="showPraise" src="../../assets/img/ic_praise.png" alt="">
							<div :class="$style.sum">{{pariseSum}}</div>
								<transition 
												name="fade1"
												@before-enter="beforeEnter1"
												@enter="enter1"
												@after-enter="afterEnter1"
												v-bind:css="true"
												v-for="(item,index) in items"
												:key="index"
								>
									<span  v-if="item.isShow" :class="$style.number">
										<img src="../../assets/img/showPraise.png" alt="">
										<!-- +{{item.number}} -->
										</span>
							</transition>
						</li>
						<!-- <li @click="showPresent">
							<img src="../../assets/img/ic_gift.png"  alt="">
						</li> -->
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
			isShowPraise:false,
			allLoaded:false,
			addPraiseNumber:0,
			getCommit:{
				"start_num":"1",
				"rows":"5",
			},
			items:[
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				{isShow:false,number:null},
				],
				showCount:0,
				danqiancout:0,
				// clickCount 对应items.length
				clickCount:10,
			  pariseSum: null,
				pariseData: {
					contentId: null,
					praiseCount: '',
				}
		}
	},
	methods:{
		beforeEnter1(){
	
		},
		enter1(){
		},
		afterEnter1(el){
			el.style.opacity = 0
 			el.style.transform='translate3d(100px,-150px,0)'
			if(this.danqiancout == this.clickCount){
				this.danqiancout = 0
				for(let i=0;i< this.clickCount;i++){
					this.items[i].isShow = false
				}
			}
		},
		getPariseSum() {
			this.pariseData.contentId =  this.item.resourceId ? this.item.resourceId : this.item.activityId,
			this.axio.post("he_live/addPraise",this.pariseData)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						this.pariseSum = res.data.praiseCount
					}
				})
    },
		showPraise(){
			if(this.showCount == 99){
				return
			}
			if(this.danqiancout < this.clickCount){
				//点赞 更新
				this.pariseData.praiseCount = 1
				this.getPariseSum()
				this.danqiancout ++;
				this.showCount ++;
				this.items[this.danqiancout-1].isShow = true
				this.items[this.danqiancout-1].number = 	this.showCount
			}
		},
		showPresent(e){ 
			e.stopPropagation()
			this.isShow = true
		},
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
			// this.$refs.inp.style.position = 'fixed'
			let top = this.$refs.top
			let thz = this
			// thz.scrollIntoViewIfNeeded()	
			// window.scrollTo(0,10)
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
						// console.log('聊天的数据-----------',this.commitList)
					}
				})
		},
		submit(e){
			e.stopPropagation() 
			var openId = this.openId 
			if(!openId){
				alert('请关注和直播')
				return
			}
			if(!this.openId){
				alert('请关注和直播')
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e9e12bcd5027906&redirect_uri=${encodeURI('http://access.hezhibo.com/index.html')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
				return
			}
			let postCommit={
						"openId":openId,
						"resourceId":this.item.resourceId?this.item.resourceId:this.item.activityId,
						"content":this.content
					}
			this.axio.post('he_live/addComment',postCommit)
				.then(data=>{
					let res = data.data
					if(res.ret.code === 0){
						this.content = ''
						this.getCommitList()
					}
				})
		}
	},
	mounted(){
			this.parentInfo = this.$refs.top
			this.openId = localStorage.getItem("openId");
	},
	created(){
		this.item = this.$route.query.item
		this.pariseSum = this.item.praiseCount
		// console.log('it---------------em',this.item)
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
<style>
.fade1-enter-active {
  animation: fade-in 1.7s;
}
.fade1-leave-active{
	opacity: 0;	
}
@keyframes fade-in {
  0% {
    transform:translate3d(0px,0,0) scale(0.5);
  }
  50% {
		opacity: 1;
		transform: scale(1)
  }
  100% {
		opacity: 0.2;
    transform:translate3d(-10px,-150px,0) scale(1.5);

  }
} 
/* @keyframes fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}  */
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
			width: 40px;
			height: 40px;
      .sum {
        background: springgreen;
        border-radius: 15px;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
      }
			.number{
				position: absolute;
				top: -20px;
				left: 15px;
				font-size: 20px;
				color: red;
			}
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>