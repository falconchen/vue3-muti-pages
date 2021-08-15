<template>  
  
</template>

<script>
/* eslint-disable */
// import { ref } from 'vue';
import { ref,watch,computed } from 'vue';
import Comment from '@/components/Comment.vue'
export default {
  name: 'CommentList',
  components: {
    Comment,    
    
  },
  props: {
    bubble: Object,
    currentUser: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { id: 0, href: "/" };
      },
    },    
  },
  emits:['bubble:delete'],
  
  setup(props) {
    
      // const tweet = ref( props.bubble.tweet_like_info )

      
      // watch(() => props.bubble, () => {
      //   tweet.value = props.bubble.tweet_like_info
      // })

      // const tweetCom = computed(() => {
      //   return props.bubble.tweet_like_info
      // })
      // return {tweet,tweetCom}

      const tweet = ref( props.bubble.tweet_like_info )
      return {tweet}
  }
}
</script>

<style lang="scss" scoped>
</style>