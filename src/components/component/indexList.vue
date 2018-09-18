<template>
   <div >

<mt-navbar class="page-part" v-model="selected">
  <mt-tab-item id="1">
		和直播
	</mt-tab-item>
  <mt-tab-item id="2">
		 实景
	</mt-tab-item>
</mt-navbar>


<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <Box/>
    <Box/>
    <Box/>
    <Box/>
    <Box/>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <Scenery/>
  </mt-tab-container-item>
</mt-tab-container>

  </div>

</template>

<script>
import Box from "../slot/Box.vue";
import Scenery from "./Scenery.vue";
import axios from 'axios';
export default {
  data() {
    return {
      selected: "1"
    };
  },
  components: { Box, Scenery },
   mounted(){
    this.axio.get('/').then(data=>{
      console.log('11',data.data)
    })
  }
};
</script>

<style scoped lang='scss'>
.tt {
  .ti {
    color: red;
    // width:1rem;
  }
}
.test {
  background: red;
  width: 100px;
  height: 100px;
}
</style>