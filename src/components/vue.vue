
<template>
<div>
  <div class="div">

  </div>
  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore" >
    <ul>
      <li v-for="item in list">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</div>
</template>

<script>
export default {
  data() {
    return {
      topStatus: "",
      list: [
        { key: 1, value: "keng" },        { key: 1, value: "keng" },
        { key: 1, value: "keng" },        { key: 1, value: "keng" },
        { key: 1, value: "keng" },        { key: 1, value: "keng" },
        { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        // { key: 1, value: "keng" },        { key: 1, value: "keng" },
        { key: 1, value: "keng" },
      ],
      allLoaded:false
    };
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
      console.log("handleTopChange");
    },
    loadTop() {
      console.log("loadTop");
    },
    loadBottom(){
        // this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        let a = 1
        this.list.push({ key: ++a, value: "keng" })
      console.log('loadBottom')
    }
    
  }
  // ...
};
</script>
<style scoped>
.div{
  height: 300px;
  background: red
}
</style>