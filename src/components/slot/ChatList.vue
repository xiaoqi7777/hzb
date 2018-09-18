<template>
    <div :class="$style.chartList">
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

					<mt-tab-container v-model="selected" >
						<mt-tab-container-item id="1">
							asd <br/>
						</mt-tab-container-item>
						<mt-tab-container-item id="2">
							<PlayDetail/>
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
          <div :class="$style.inputTab">
						<input :class="$style.input" type="text" placeholder="我来说两句">
						<Button :class="$style.btn">发送</Button>
					</div>
    </div>
</template>

<script>
import PlayDetail from './PlayDetail.vue'
export default {
	data(){
		return{
			selected:'2'
		}
	},
	components:{
		PlayDetail
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
		flex: 1
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