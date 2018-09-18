<template>
    <div :class='$style.playDetail'>
                <Play/>
    			<ChatList :class="$style.chatlist"/>
    </div>
</template>

<script>
import Play from "../slot/Play.vue";
import ChatList from '../slot/ChatList.vue'
    export default {
        components:{
					Play,
					ChatList
				}
    }
</script>

<style module lang='scss'>
@import '../../assets/css/element.scss';
.playDetail{
    height: 100%;
    @include list(column);
    .chatlist{
        flex: 1;
        margin-top: 0.5rem;
    }
}
</style>