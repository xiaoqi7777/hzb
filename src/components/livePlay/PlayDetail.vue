<template>
    <div :class='$style.playDetail'  @click="btnShow($event)">
        <div :class="$style.play"  v-show="isSpinner">
          <Play @childrenVlue='showFn'/>
          <ChatList :class="$style.chatlist"/>
        </div>
        <!-- 等待的 圈圈动画 -->
        <div class="spinner" v-show="!isSpinner">
          <mt-spinner color="#26a2ff" :size=50 :type="3"></mt-spinner>
        </div>
    </div>
</template>  
 
<script>
import Play from "../livePlay/Play.vue";
import ChatList from "../livePlay/ChatList.vue";
import Brother from "@/utils/brother";
export default {
  components: {
    Play,
    ChatList
  },
  data(){
    return{
      isSpinner:false 
    }
  },
  created(){
    this.showFn()
  },
  methods: {
    showFn(data){
      if(data){
        this.isSpinner = true
      }
    },
    btnShow(e) {
      let dom = e.target;
      console.log("eeeeeeee11111111111111");
      if (!dom.matches(".isShow")) {
        console.log("++++++++++++++++++	");
        Brother.$emit("isShow", false);
      }
    }
  }
};
</script>

<style module lang='scss'>
@import "../../assets/css/element.scss";
.playDetail {
    height: 100%;
  .play{
  @include list(column);
    height: 100%;
    .chatlist {
      flex: 1;
      margin-top: 0.5rem;
    }
  }
}
</style>