<template>
  <div class="w3-padding-bottom hi-excerpt">
    <div class="hi-tweet-header-wrap">
      <div class="portrait">
        <img :src="tweet.portrait" style="cursor: pointer" />
      </div>

      <a class="tweet-author" :href="`/@${tweet.author}`">{{ tweet.author }}</a>
      <div class="tweet-pubdate">{{ tweet.pubDate }}</div>

      <div class="tweet-mark w3-green">
        <a href="/bubbles"> 冒泡</a>
      </div>
    </div>

    <section class="hi-tweet-content-wrap">
      <div class="w3-large hi-tweet-content" v-html="tweet.body"></div>

      <!-- gallery begin-->
      <div
        class="gallery-wrap w3-margin-top w3-margin-bottom"
        v-if="tweet.images"
      >
        <!-- gallery -->
        <div
          class="responsive w3-border"
          v-for="(image, index) in tweet.images"
          :key="index"
        >
          <div class="gallery" >
            
            <img
              :src="image.thumb"
              :alt="image.name"
              width="200"
              height="200"
              :data-original="image.href"
              style="cursor: pointer"
              @click="showImg(index)"
            />            

          </div>
          
        </div>
        
        <div class="clearfix"></div>
        <vue-easy-lightbox
              :scrollDisabled="true"              
              :moveDisabled="true"
              :loop="true"
              :visible="imgVisible"
              :imgs="imgsBig"
              :index="imgIndex"
              @hide="handleHide"
            ></vue-easy-lightbox>
      </div>
      <!-- /.gallery-wrap -->
      <!--gallery end-->
    </section>

    <div class="w3-small w3-clear hi-meta">
      <a
        target="_blank"
        :href="`/p/${tweet.postName}`"
        class="hi-text-lighter-blue hi-like-count"
      >
        {{ tweet.likeCount }} 赞
      </a>

      <a
        target="_blank"
        :href="`/p/${tweet.postName}`"
        class="hi-dot hi-text-lighter-blue hi-comment-count"
      >
        {{
          tweet.commentCount == 0 ? "暂无评论" : `${tweet.commentCount} 评论`
        }}
      </a>

      <a
        v-if="currentUser.id == tweet.postAuthor"
        class="hi-dot hi-text-lighter-blue"
        :href="`/post-admin/edit/${tweet.postName}`"
      >
        编辑</a
      >

      <a class="hi-dot hi-text-lighter-blue" :href="`/p/${tweet.postName}`"
        >查看</a
      >

      <a
        v-if="currentUser.id == tweet.postAuthor"        
        class="w3-text-white w3-grey w3-right w3-padding-small"
        href="javascript:;"
        @click.prevent="$emit('tweet:delete',tweet.postName)"
        >删除</a
      >
    </div>
  </div>
</template>

<script>
//import { toRef } from 'vue';
import {ref} from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
  name: "Tweet",
  components: {
    VueEasyLightbox
  },
  props: {
    tweet: Object,

    currentUser: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { id: 0, href: "/" };
      },
    },
  },
   emits: ['tweet:delete'],

  setup(props) {
    
    
      const imgVisible = ref(false);
      const imgIndex = ref(0);      
      
      const imgsBig= ref( [] )
      imgsBig.value = props.tweet.images ? props.tweet.images.map((img)=>{
        //return { src:img.href, title:img.name}    
        return img.href;
      }) :[]
      
      const showImg = (idx) =>{
        imgIndex.value = idx        
        imgVisible.value = true
      }

      const handleHide = () =>{
        imgVisible.value = false
      }
    
      return {imgVisible,imgIndex,imgsBig,showImg,handleHide}
  },
};
</script>

<style lang="scss" scoped>
</style>
