<template>
  <Tweet :tweet="tweet" />
</template>

<script>
import {ref} from 'vue'
import Tweet from '@/components/Tweet.vue'


export default {
  name: 'App',
  components: {
    Tweet
    
  },
  setup() {
    const tweet = ref({})
    tweet.value = {
            "author": "Falcon",
            "id": "23415401",
            "authorid": 0,
            "body": "[重要通知] 开源中国的OpenAPI接口已关闭了动弹的大部分功能，我只能开发新的动弹网站，目前已接入OSC、微博、Github第三方登录，近日将完成基本功能，效果详见: https://d.cellmean.com",
            "portrait": "https://oscimg.oschina.net/oscnet/up-qtr2z6469a08hiocm005gfnnuta6yxly!/both/460x460?t=1569475632000",
            "pubDate": "2021-07-17 20:49:03",
            "commentCount": 0,
            "likeCount": 0,
            "oscAuthorid": 0,
            "postId": 9680,
            "postName": "23415401",
            "postAuthor": 12,
            "images": [
                {
                    "h": 0,
                    "href": "http://oscimg.oschina.net/oscnet/up-c6rynoapidsgrswyngyb4isq122qwkb2",
                    "name": "up-c6rynoapidsgrswyngyb4isq122qwkb2",
                    "thumb": "http://oscimg.oschina.net/oscnet/up-c6rynoapidsgrswyngyb4isq122qwkb2",
                    "type": "0",
                    "w": 0
                },
                {
                    "h": 0,
                    "href": "http://oscimg.oschina.net/oscnet/up-upzegcum6ry2s21qpmze246gr1ht3c12",
                    "name": "up-upzegcum6ry2s21qpmze246gr1ht3c12",
                    "thumb": "http://oscimg.oschina.net/oscnet/up-upzegcum6ry2s21qpmze246gr1ht3c12",
                    "type": "0",
                    "w": 0
                },
                {
                    "h": 0,
                    "href": "http://oscimg.oschina.net/oscnet/up-d1q0renz73pifoqyd0rz914b84bc62d0",
                    "name": "up-d1q0renz73pifoqyd0rz914b84bc62d0",
                    "thumb": "http://oscimg.oschina.net/oscnet/up-d1q0renz73pifoqyd0rz914b84bc62d0!/sq/200",
                    "type": "0",
                    "w": 0
                }
            ],
            "imgSmall": "https://oscimg.oschina.net/oscnet/up-c6rynoapidsgrswyngyb4isq122qwkb2,https://oscimg.oschina.net/oscnet/up-upzegcum6ry2s21qpmze246gr1ht3c12,https://oscimg.oschina.net/oscnet/up-d1q0renz73pifoqyd0rz914b84bc62d0!/sq/200",
            "imgBig": "https://oscimg.oschina.net/oscnet/up-c6rynoapidsgrswyngyb4isq122qwkb2,https://oscimg.oschina.net/oscnet/up-upzegcum6ry2s21qpmze246gr1ht3c12,https://oscimg.oschina.net/oscnet/up-d1q0renz73pifoqyd0rz914b84bc62d0"
        }
    return {tweet}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
