l<template>
  <div class="tweet-box-container w3-margin-bottom">
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
        <var-uploader v-model="images" @after-read="addImage" @remove="removeImage" :maxlength="9"/>
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
</template>

<script>
import { ref, computed } from "vue";
//import utils from '@/includes/utils.js';
import { Snackbar as Msg} from '@varlet/ui' // https://varlet.gitee.io/varlet-ui/#/zh-CN/snackbar

export default {

  setup() {
    const tweetPlaceHoder = {
      blankText: "灵魂拷问：今天你动弹了吗？",
      tweetingText: "玩命动弹中...",
    };

    console.log(process.env.VUE_APP_API_URL)

    let errorMsg = ''

    const tweetMaxLength = 160;

    const contentPlaceholderText = ref(tweetPlaceHoder.blankText);

    const content = ref("");

    const images = ref([]);
    
    

    const addImage = (image) => {
      
      
      
      // console.log(image);
      
      // console.log(images.value)

      image.state = 'loading'
      const formData = new FormData()
      formData.append('image', image.file)

      setTimeout(

        ()=>{
          fetch('https://hi.local.cellmean.com/api/images', {
          method: 'POST',
          mode:"cors",
          headers:{
            // 'Content-Type': 'multipart/form-data',
            'Hi-Token':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjcwOTgyMDYsImV4cCI6MTYyOTY5MDIwNiwianRpIjoiNGFiN2VlZGItZGM0YS00YTMxLWJjY2UtZWYzMjlkZDAxOTAwIiwic3ViIjoiSElfQVVUSF9VU0VSIiwidWlkIjoxMiwic2NvcGVzIjpbImNvbGxlY3Rpb25zLmNyZWF0ZSIsImNvbGxlY3Rpb25zLnJlYWQiLCJjb2xsZWN0aW9ucy51cGRhdGUiLCJjb2xsZWN0aW9ucy5kZWxldGUiLCJjb2xsZWN0aW9ucy5saXN0IiwiY29sbGVjdGlvbnMuYWxsIl19.MhCCYExmU3c6RtfB5dIVwWr0F9ZIi4Vgg4wR6t0aU24"
          },
          body: formData,
          }).then(res => res.json())
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
                  throw Error('出错了：'+res.error.join(';'))
                }
                
                image.state = 'success'
                image.media_id = res.data.media_id                
            }
          ).catch(

            err=>{
              image.state = 'error'               
              errorMsg = err.message
              Msg.error(errorMsg)
            }
            
          )
        },3000

      )
                      
    }

    const removeImage = ()=>{

      Msg.success('图片已移除')      

    }
    
    const mediaIds = computed(
      ()=>images.value.filter((image)=>image.state=='loading').map((image)=>image.media_id)
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
      const formData = new FormData()
      formData.append('content',content.value)
      if(images.value.length > 0) {
        images.value.forEach((image,index)=>{
          formData.append(`image[${index}]`, image.url)
        })
      }          
      console.log(formData)       
    }




    return {
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


