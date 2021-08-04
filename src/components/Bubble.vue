<template>  
  <Tweet :tweet="tweet" />
  
</template>

<script>
/* eslint-disable */
// import { ref } from 'vue';
import { ref,watch,computed } from 'vue';
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