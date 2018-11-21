<template>
  <div>
    <div :class='$style.more' v-if="isSpinner">
      <section>
        <img src="../../assets/img/timg.jpg" alt="">
      </section>

      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :auto-fill="autoFill" :bottom-all-loaded="allLoaded" ref="loadmore" >
        <div :class="$style.load">
            <ThinIntroduce v-for='(item,index) in data' :key="index" :item='item' :class="$style.flex"/>
            <div :class="$style.div"></div>
            <div :class="$style.div"></div>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>    
    </div>
    <div class="spinner" v-if="!isSpinner">
      <mt-spinner color="#26a2ff" :size=50 :type="3"></mt-spinner>
    </div>

  </div>
</template>

<script>
import ThinIntroduce from "./ThinIntroduce";
export default {
  data() {
    return {
      topStatus: "",
      allLoaded: false,
      id: null,
      data: null,
      submitData: {
        start_num: "1",
        rows: "8",
        groupId: "",
        type: "1"
      },
      autoFill: false,
      isSpinner:false,
      stopLoadData:false
    };
  },
  components: {
    ThinIntroduce
  },
  methods: {
    getData() {
      this.submitData.groupId = this.id;
      let data = this.submitData;
      this.axio.post("he_live/getSceneList", data).then(data => {
        let res = data.data.data;
        this.isSpinner = true
        if (this.data == null) {
          this.data = res.resourceList;
        } else {
          if(res.resourceList.length === 0){
            this.stopLoadData = true
          }
          // console.log("+++++++++++++", data.data);
          this.data.push(...res.resourceList);
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
      // console.log("handleTopChange");
    },
    loadTop() {
      let thz = this;
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      if(this.stopLoadData){
        this.allLoaded = true
      }
      this.$refs.loadmore.onBottomLoaded();
      this.submitData.start_num++;
      this.getData();
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
  }
};
</script>


<style lang='scss' module>
@import "../../assets/css/element.scss";
.more {
  img {
    width: 100%;
    height: 200px;
  }
  .load {
    @include list(row);
    flex-wrap: wrap;
    .div {
      width: 50%;
    }
    .flex {
      flex: 1;
    }
  }
}
</style>