l<template>
  

  <div class="tweet-box-container w3-margin-bottom" v-if="hasLogin">
    <form @submit.prevent="handleSubmit">
      <section class="tweet-fields tweet-content">
        <var-input          
          :placeholder="contentPlaceholderText"
          @focus="placehoderToggle"
          @blur="placehoderToggle"
          :maxlength="tweetMaxLength"
          textarea
          v-model="content"
          required
          
        />
      </section>

      <section class="tweet-fields">
        <var-uploader v-model="images" @after-read="addImage" @remove="removeImage" :maxlength="3"/>
      </section>

      <section class="tweet-fields tweet-topics" v-if="tweetTopics.length">
          
          <span><var-icon name="fire" />动弹话题</span>
          <var-chip class="tweet-topic"
          plain
          type="primary"
          v-for="topic in tweetTopics"
          :key="topic"
        >
          {{ topic }}
        </var-chip>
        
        
      </section>

      <input type="hidden" name="media-ids" v-model="mediaIds" />

      <section class="tweet-fields">

        <var-button type="success" class="w3-right">
          发送动弹
          
          <var-icon name="chevron-right" :size="14"/>
          
        </var-button>
        <div class="w3-clear"></div>
      </section>
    </form>
  </div>
<div class="w3-section w3-margin-large sns-login-div wider" v-else >
    <SnsLoginButtons :API_URL="API_URL"/>
</div>
</template>

<script>
import { ref, computed,onMounted } from "vue";

import utils from '@/includes/utils.js'; //这个不会实时生效，需要重启构建
import { Snackbar as Msg} from '@varlet/ui' // https://varlet.gitee.io/varlet-ui/#/zh-CN/snackbar
import SnsLoginButtons from '@/components/SnsLoginButtons.vue';

export default {

  components: { SnsLoginButtons },

  setup() {

    // async  function wait(seconds) { 
    //   await new Promise(resolve=>{
    //     setTimeout(resolve,seconds)                    
    //   })      
    // }
    
    const API_URL = utils.rtrim(process.env.VUE_APP_API_URL,'/');

    const hasLogin = ref(false)

    const tweetPlaceHoder = {
      blankText: "灵魂拷问：今天你动弹了吗？",
      tweetingText: "玩命动弹中...",
      successText: "刚才你动弹了！",
    };

    
    let hiToken = null

    let errorMsg = ''

    const tweetMaxLength = 160;

    const contentPlaceholderText = ref(tweetPlaceHoder.blankText);

    const content = ref("");

    const images = ref([]);
    

    // console.log(API_URL)
    


    const addImage = (image) => {
      
      
      
      // console.log(image);
      
      // console.log(images.value)

      image.state = 'loading'
      const formData = new FormData()
      formData.append('image', image.file)

      setTimeout(

        ()=>{
          
          fetch(API_URL +'/api/images', {
            method: 'POST',
            mode:"cors",
            headers:{
              // 'Content-Type': 'multipart/form-data',
               'Hi-Token':hiToken
            },
          body: formData,
          })
          .then(
            res => res.json()
          )
          .then(
            /**
             * 格式如下：
             * {
                    "success": true,
                    "code": 200,
                    "message": "success",
                    "data": {
                        "content_type": "image/png",
                        "media_author": 12,
                        "title": "Xnip2021-06-17_16-08-58",
                        "updated_at": "2021-07-25 07:42:43",
                        "created_at": "2021-07-25 07:42:43",
                        "media_id": 8494,
                        "origin_url": "/media/image/302/302/8494.png",
                        "local_path": "/302/302/8494.png"
                    },
                    "error": []
                }
             */
            (res) => {

                if(!res.success) {                  
                  throw Error(`${res.message} ${res.error.join(';')}`)
                }
                
                image.state = 'success'
                image.media_id = res.data.media_id                
            }
          ).catch(

            err=>{
              image.state = 'error'               
              errorMsg = '出错了：'+err.message
              Msg.error(errorMsg)
            }
            
          )
        },10

      )
                      
    }

    const removeImage = ()=>{

      Msg.success('图片已移除')      

    }
    
    const mediaIds = computed(
      ()=>images.value.filter((image)=>image.state=='success').map((image)=>image.media_id)
    )

    const placehoderToggle = () => {
      const { blankText, tweetingText } = tweetPlaceHoder;

      if (content.value.length > 0) {
        contentPlaceholderText.value = tweetingText;
      } else {
        contentPlaceholderText.value =
          contentPlaceholderText.value == blankText ? tweetingText : blankText;
      }
    };

    /*提取动弹话题*/
    const tweetTopics = computed(() => {
      const re = /#([^#]*)#/g;
      const result = [...content.value.matchAll(re)].map((item) => item[1].replace(/^\s|\s$/,''));      
      return result.filter((item)=>item != false);
    });

    const handleSubmit = async () =>{
      // const tweet = {
      //   content :content.value,
      //   images:images.value
      // }
      // const formData = new FormData()
      // formData.append('content',content.value)
      // if(images.value.length > 0) {
      //   images.value.forEach((image,index)=>{
      //     formData.append(`image[${index}]`, image.url)
      //   })
      // }          
      // console.log(formData)

      const tweet = {
        content : content.value,
        media_ids : mediaIds.value
      }
      fetch(API_URL +'/api/bubbles', {
            method: 'POST',
            mode:"cors",
            headers:{
              'Content-Type':'application/json',
               'Hi-Token':hiToken
            },
          body: JSON.stringify(tweet) ,
          }).then(res => {                        
              return res.json()
            })
          .then(
            
            (res) => {

                if(!res.success) {                  
                  throw Error(`${res.message} ${res.error.join(';')}`)
                }else{
                  Msg.success(`${res.message}`)
                  contentPlaceholderText.value = tweetPlaceHoder.successText
                  content.value = ''
                  images.value = []

                  setTimeout(()=>location.reload(),1500);
                }
                                
            }
          ).catch(

            err=>{                             
              errorMsg = '出错了：' + err.message
              Msg.error(errorMsg)
            }
            
          )
      
      
    }


    //hooks
    onMounted(() => {

      const hiData = JSON.parse(localStorage.getItem("hiData"))
      if(hiData !== undefined && hiData.token !== undefined && hiData.expires !== undefined) {
        if( hiData.expires - utils.time() < 0){//过期        
          localStorage.removeItem("hiData")
          hasLogin.value = false
        }else{          
          hasLogin.value = true
          hiToken = hiData.token
        }
      }


    })




    return {
      API_URL,
      hasLogin,
      content,
      images,
      mediaIds,
      addImage,
      removeImage,
      contentPlaceholderText,
      placehoderToggle,
      tweetMaxLength,
      tweetTopics,
      handleSubmit,
      //errorMsg
    };
  },
};
</script>

<style scoped>
.tweet-box-container {
  padding: 2rem 3rem;
  background-color: #fff;
}
.tweet-fields:not(:first-of-type) {
  margin-top: 1rem;
}
@media (max-width: 600px) {
  .tweet-box-container {
    padding: 1rem;
  }
}
.tweet-content {
  font-size:1.1rem;
}
.tweet-topics span{
  margin-right:.5rem;
}
</style>>


