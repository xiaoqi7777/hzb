<template>
    <div :class='$style.playDetail'  @click="btnShow($event)">
        <Play/>
        <ChatList :class="$style.chatlist"/>
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
  methods: {
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
  @include list(column);
  .chatlist {
    flex: 1;
    margin-top: 0.5rem;
  }
}
</style>