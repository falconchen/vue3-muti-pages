<template>
    <div class="">
    <div
      v-for="(src, index) in imgs"
      :key="index"
      class="pic"
      @click="() => showImg(index)"
    >
      <img :src="src" />
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
</template>

<script>
// 如果VueApp已经注册组件，则这里不需要单独引入
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      visible: false,
      index: 0, // default: 0
      imgs: [
        'https://via.placeholder.com/450.png/',
        'https://via.placeholder.com/300.png/',
        'https://via.placeholder.com/150.png/',
        { src: 'https://via.placeholder.com/450.png/', title: 'this is title' }
      ]
    }
  },
  methods: {
      showImg(index) {
        this.index = index
        this.visible = true
      },
      handleHide() {
        this.visible = false
      }
  }
}
</script>