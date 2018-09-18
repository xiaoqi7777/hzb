<template>
    <div :class="$style.Scenery">
        <section :class="$style.swipe">
            <mt-swipe :auto="4000" >
								<mt-swipe-item style="background:red">1</mt-swipe-item>
								<mt-swipe-item style="background:black">2</mt-swipe-item>
								<mt-swipe-item style="background:blue">3</mt-swipe-item>
						</mt-swipe>
        </section>
				<SceneryList :class="$style.thin">
				</SceneryList>
				<SceneryList :class="$style.thin">
				</SceneryList>
    </div>
</template>

<script>
import SceneryList from "../slot/SceneryList.vue";
export default {
  components: {
    SceneryList
  }
};
</script>

<style lang='scss' module>
.Scenery {
	background:#E0E0E0;
  .swipe {
    height: 200px;
	}
	.thin{
		margin-top: 10px;
	}
}
</style>