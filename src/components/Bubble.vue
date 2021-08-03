<template>  
  <Tweet :tweet="tweet" />
  
</template>

<script>
import { ref } from 'vue';
import Tweet from '@/components/Tweet.vue'
export default {
  name: 'Bubble',
  components: {
    Tweet    
  },
  props: {
    bubble: Object
  },
  setup(props) {
    
      const tweet = ref( props.bubble.tweet_like_info )
      return {tweet}
  }
}
</script>

<style lang="scss" scoped>
</style>