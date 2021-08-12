<template>
  <div>
    {{ title }}
  </div>
</template>

<script>
import { ref } from "vue";
import utils from "@/includes/utils";
export default {
  setup() {
    const title = ref("正在退出");
    localStorage.removeItem("hiData");
    localStorage.removeItem("bubble");

    let i = 1;
    setInterval(() => {
      if (i % 4 == 0) {
        title.value = utils.rtrim(title.value, ".");
      } else {
        title.value += ".";
      }
      i++;
    }, 200);
    setTimeout(() => (window.location.href = "/"), 1000);

    return { title };
  },
};
</script>

<style lang="scss" scoped>
</style>