<template>
  
    <div class="w3-padding-bottom hi-excerpt">
      <div class="hi-tweet-header-wrap">
        <div class="portrait">
          <img
            :src="tweet.portrait"
            style="cursor: pointer"
          />
        </div>

        <a class="tweet-author" :href="`/@${tweet.author}`">{{tweet.author}}</a>
        <div class="tweet-pubdate">{{tweet.pubDate}}</div>

        <div class="tweet-mark w3-green">
          <a href="/bubbles"> 冒泡</a>
        </div>
      </div>

      <section class="hi-tweet-content-wrap">
        <div class="w3-large hi-tweet-content">

            {{tweet.body}}
        </div>

        <!-- gallery begin-->
        <div class="gallery-wrap w3-margin-top w3-margin-bottom">
          <!-- gallery -->
          <div class="responsive w3-border" v-for="(image,index) in tweet.images" :key="index">
            <div class="gallery">
              
              <img                
                :src="image.thumb"
                :alt="image.name"
                width="200"
                height="200"
                :data-original="image.href"
                style="cursor: pointer"
              />
            </div>
          </div>

          <div class="clearfix"></div>
        </div>
        <!-- /.gallery-wrap -->
        <!--gallery end-->
      </section>

      <div class="w3-small w3-clear w3-margin-right hi-meta">
        <a
          target="_blank"
          :href="`/p/${tweet.postName}`"
          class="hi-text-lighter-blue hi-like-count"
        >
          {{tweet.likeCount}} 赞
        </a>

        <a
          target="_blank"
          :href="`/p/${tweet.postName}`"
          class="hi-dot hi-text-lighter-blue hi-comment-count"
        >
          {{tweet.commentCount ==0 ? '暂无评论' : `${tweet.commentCount} 评论` }}
        </a>

        <!-- <a
          class="hi-dot hi-text-lighter-blue"
          href="/post-admin/edit/046a582dbac2"
        >
          编辑</a
        > -->

        <a class="hi-dot hi-text-lighter-blue" :href="`/p/${tweet.postName}`">查看</a>
      </div>
    </div>
  
</template>

<script>
import { toRef } from 'vue';
export default {
  name: 'Tweet',
  props: {
    tweet: Object
  },
  setup(props) {

      const tweet2 = toRef(props, 'tweet') //tweet.likes
      return {tweet2}
  }
}
</script>

<style lang="scss" scoped>
</style>
