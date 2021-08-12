<template>
    <div v-show="showDiv">loading...</div>
</template>
<script>
import { onMounted, onUnmounted ,ref} from "vue";

export default {
  name: "InfinityScroll",
  props: {
    
    distance: {
      type: Number,
      default: 200,
    },
  },
  emits: ["reach-distance"],

  setup(props, context) {

    const showDiv = ref(false)

    const scrollHandle = () => {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      let distance = scrollHeight - scrollTop - clientHeight;
      if (distance < props.distance) {          
        showDiv.value = true
        context.emit("reach-distance");
      }else{
          showDiv.value = false
      }
    };

    onMounted(() => {
      //组件挂载时，添加scroll监听
      window.addEventListener("scroll", scrollHandle, false);
    });
    onUnmounted(() => {
      //组件卸载时，停止监听
      window.removeEventListener("scroll", scrollHandle, false);
    });
    return {showDiv};
  },
};
</script>

<style lang="scss" scoped>
</style>