l<template>
  <teleport to="#navbar .navbar-right">
    

    <li class="w3-dropdown-hover w3-left avatar-dropdown-hover" v-if="hasLogin">
      
      

      <a class="w3-button w3-left-align"> 
        <div class="portrait login-portrait" v-if="loginUser.avatar"><img :src="loginUser.avatar" /></div>
        <i v-else class="fa fa-user-o"></i>       
        <span class="username">{{ loginUser.username }}</span>
        <i class="fa fa-angle-down"></i>
      </a>

      <ul class="w3-dropdown-content w3-bar-block w3-card-4 nav nabar">
        <li>
          <a class="" :href="`/@${loginUser.username}`">
            <i class="fa fa-home"></i>
            {{loginUser.username}}
          </a>
        </li>
       
      <li>
        <a class="" :href="logoutUrl">
          <i class="fa fa-sign-out"></i>
          退出
        </a>
      </li>
      </ul>
    </li>
    
  </teleport>

  <teleport to="body">
    <var-back-top :duration="500" class="d-back-to-top" />
  </teleport>

  <teleport to=".hi-list">
    <li
      class="hi-post-type-tweet w3-border-0 w3-margin-bottom new-tweet-list"
      id="new-tweet-list"
    >
      
    <infinite-scroll
      @infinite-scroll="loadMore"
      :message="loadMoreMessage"
      :noResult="loadMoreNoResult"
    >
    
        <ul>  
        <li v-for="bubble in pubBubbles" :key="bubble.post_name">
          <Bubble :bubble="bubble" :currentUser="loginUser" @bubble:delete="handleBubbleDelete" />
        </li>
        </ul>
    
    </infinite-scroll>

      
    </li>
  </teleport>

  <div class="tweet-box-container w3-margin-bottom" v-if="hasLogin">
    <!-- <transition class="tweet-box-container w3-margin-bottom" v-if="hasLogin" name="fade" tag="div" appear> -->
    <form @submit.prevent="handleSubmit">
      <section class="tweet-fields tweet-content">
        <var-input
          :placeholder="contentPlaceholderText"
          @focus="placehoderToggle"
          @blur="placehoderToggle"
          :maxlength="tweetMaxLength"
          :rows="8"
          textarea
          v-model="content"
        />
      </section>

      <section class="tweet-fields">
        <var-uploader
          v-model="images"
          :multiple="true"
          @after-read="addImage"
          @remove="removeImage"
          :maxlength="9"
        />
      </section>

      <section class="tweet-fields tweet-topics" v-if="tweetTopics.length">
        <span><var-icon name="fire" />动弹话题</span>
        <var-chip
          class="tweet-topic"
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
        <var-button
          type="success"
          :disabled="uploadingImages > 0 || tweetSending || tweetSendSucess"
          class="w3-right"
        >
          <span v-if="uploadingImages > 0">
            图片上传中...
            <var-icon name="upload" :size="14" />
          </span>

          <span v-else-if="tweetSending"> 正在发送... </span>

          <span v-else-if="tweetSendSucess">
            发送成功
            <var-icon name="check" :size="14" />
          </span>

          <span v-else>
            发送动弹
            <var-icon name="chevron-right" :size="14" />
          </span>
        </var-button>
        <div class="w3-clear"></div>
      </section>
    </form>
    <!-- </transition> -->
  </div>

  <div class="w3-margin-large sns-login-div wider" v-else>
    <SnsLoginButtons :API_URL="API_URL" />
  </div>
<!--   
  <teleport to=".hi-list">
    <InfinityScroll class="w3-white w3-card w3-padding w3-center" :distance="300" @reach-distance="loadMore" />
  </teleport> -->
</template>

<script>
import { ref, computed, onMounted, watch, reactive } from "vue";
import InfiniteScroll from 'infinite-loading-vue3';

import utils from "@/includes/utils.js"; //这个不会实时生效，需要重启构建
import API from "@/includes/API.js";
import { Dialog, Snackbar as Msg } from "@varlet/ui"; // https://varlet.gitee.io/varlet-ui/#/zh-CN/snackbar
//import {  } from "@varlet/ui";

import SnsLoginButtons from "@/components/SnsLoginButtons.vue";
import Bubble from "@/components/Bubble.vue";
//import InfinityScroll from "@/components/InfinityScroll.vue"

export default {
  components: { InfiniteScroll,SnsLoginButtons, Bubble },

  setup() {

    const logoutUrl = ref( utils.rtrim(process.env.VUE_APP_PUBLIC_URL, "/") + '/logout')
    // async  function wait(seconds) {
    //   await new Promise(resolve=>{
    //     setTimeout(resolve,seconds)
    //   })
    // }
    utils.StringPrototypes();

    const API_URL = utils.rtrim(process.env.VUE_APP_API_URL, "/");

    const loginUser = ref({});

    const api = new API(API_URL);
    
    const url = api.url;

    const hasLogin = ref(false);

    const tweetPlaceHoder = {
      blankText: "不动弹，勿宁死！",
      tweetingText: "动弹进行时",
      successText: "刚才你动弹了！",
    };

    //const sendBtnStatus = ref({disabled:true,text:"发送动弹"}); //发送动弹按钮

    let hiToken = null;

    let errorMsg = "";

    const tweetMaxLength = 320;

    const contentPlaceholderText = ref(tweetPlaceHoder.blankText);

    const content = ref("");

    const images = ref([]);

    let bubbleFromStorage = reactive({});

    const bubbleFromStorageParsed = JSON.parse(localStorage.getItem("bubble"))
    
    if (!utils.isEmpty(bubbleFromStorageParsed)) {
      !utils.isEmpty(bubbleFromStorageParsed.content) &&
        (content.value = bubbleFromStorageParsed.content);
      !utils.isEmpty(bubbleFromStorageParsed.images) &&
        (images.value = bubbleFromStorageParsed.images);
      bubbleFromStorage = bubbleFromStorageParsed
    } 

    const uploadingImages = ref(0);
    const tweetSending = ref(false);
    const tweetSendSucess = ref(false);
    // console.log(API_URL)

    const pubBubbles = ref([      
    ]);

    const addImage = (image) => {

      image.state = "loading";
      const formData = new FormData();
      //console.log(image.file);

      formData.append("image", image.file);

      uploadingImages.value += 1;
      fetch(url.images, {
        method: "POST",
        mode: "cors",
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "Hi-Token": hiToken,
        },
        body: formData,
      })
        .then((res) => res.json())
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
            if (!res.success) {
              throw Error(api.apiErrorMsg(res));
            }
            
            image.state = "success";
            image.media_id = res.data.media_id;
            image.cover = API_URL+ res.data.origin_url
            image.url = API_URL+ res.data.origin_url
            //console.log(image)
          }
        )
        .catch((err) => {
          image.state = "error";
          errorMsg = "出错了：" + err.message;
          Msg.error(errorMsg);
        })
        .finally(() => (uploadingImages.value -= 1));
    };

    const removeImage = () => {
      Msg.success("图片已移除");
    };

    const mediaIds = computed(() =>
      images.value
        .filter((image) => image.state == "success")
        .map((image) => image.media_id)
    );

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
      const result = [...content.value.matchAll(re)].map((item) =>
        item[1].replace(/^\s|\s$/, "")
      );
      return result.filter((item) => item != false);
    });

    const handleSubmit = () => {     

      const tweet = {
        content: content.value.trim(),
        media_ids: mediaIds.value,
      };
      if (tweet.content.length == 0 && tweet.media_ids.length == 0) {
        errorMsg = "至少写点什么吧...";
        Msg.warning(errorMsg);
        return;
      }

      let sending = Msg.loading("玩命发送...");
      tweetSending.value = true;

      fetch(url.bubbles, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Hi-Token": hiToken,
        },
        body: JSON.stringify(tweet),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!res.success) {
            throw Error(api.apiErrorMsg(res));
          } else {
            sending.clear();
            tweetSendSucess.value = true;
            Msg.success(`${res.message}`);
            contentPlaceholderText.value = tweetPlaceHoder.successText;
            content.value = "";
            images.value = [];

            setTimeout(() => (tweetSendSucess.value = false), 1000);

            //pubBubbles.value = [{post_content:"Hello new"}]
            const post = res.data;
            const endPoint = url.bubbles + "/" + post.post_name;
            return fetch(endPoint, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Hi-Token": hiToken,
              },
            });
          }
        })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!res.success) {
            throw Error(api.apiErrorMsg(res));
          }
          let newBubble = res.data;
          pubBubbles.value = [newBubble, ...pubBubbles.value];
        })

        .catch((err) => {
          sending.clear();
          //tweetSending.value=false
          errorMsg = "出错了：" + err.message;
          Msg.error(errorMsg);
        })
        .finally(() => (tweetSending.value = false));
    };

    const handleBubbleDelete = (postName) => {
      /**处理动弹删除 */
      // const actions = {
      //   confirm: () => {

      //   },
      //   cancel: () => Msg.error('cancel'),
      //   close: () => Msg.info('close'),
      // }

      const onBeforeClose = (action, done) => {
        if (action == "confirm") {
          const deletingMsg = Msg.loading("正在删除");
          const endPoint = url.bubbles + "/" + postName;
          fetch(endPoint, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Hi-Token": hiToken,
            },
          })
            .then((res) => res.json())
            .then(
              /**
           * 格式如下：
           * {
                  "success": true,
                  "code": 200,
                  "message": "success",                  
                  "error": []
              }
            */
              (res) => {
                if (!res.success) {
                  throw Error(utils.apiErrorMsg(res));
                }
                pubBubbles.value = pubBubbles.value.filter(
                  (bubble) => bubble.post_name != postName
                );
                deletingMsg.clear();
              }
            )
            .catch((err) => {
              errorMsg = "出错了：" + err.message;
              Msg.error(errorMsg);
            })
            .finally(() => {
              done();
            });
        }

        done();
      };

      Dialog({
        title: "确实要删除这条动弹吗？",
        message: "删除后不可恢复哦！",
        onBeforeClose,
      });
    };

    //將動彈緩存在localstorage

    watch(content, (content) => {
      bubbleFromStorage.content = content;
      localStorage.setItem(
        "bubble",
        JSON.stringify(bubbleFromStorage).escapeSpecialChars()
      );
    });
    watch(mediaIds, () => {

      bubbleFromStorage.images = images.value.filter(
        (image) => image.state == "success"
      );
      localStorage.setItem(
        "bubble",
        JSON.stringify(bubbleFromStorage).escapeSpecialChars()
      );
    });

    //加载动弹列表
    
    const page = ref(1);
    let loadingSwitch = false;
    //const loadMore = () =>{console.log('loading')}
    
    const loadMore = () =>{

      if( loadingSwitch ){        
        return ;
      }
      loadingSwitch = true;
      
      fetch(api.url.bubbles+'?page='+page.value, {
          method: "GET",
      }).then((res) => {
            if (res.ok) {
              // 此处加入响应状态码判断
              return res.json();
            } else {
              throw Error(res.statusText);
            }
      }).then((res) => {
        if (!res.success) {
            throw Error(api.apiErrorMsg(res));
        }else{          
          let newBubbles = res.data;
          //console.log(newBubbles);
          //pubBubbles.value = [...newBubbles, ...pubBubbles.value];
          pubBubbles.value = [ ...pubBubbles.value,...newBubbles,];
          page.value = page.value + 1;
        }
        loadingSwitch =  false
      })
      .catch((err) => {
        errorMsg = "出错了：" + err.message;
        Msg.error(errorMsg);
      }).finally(()=>{
        
      });


    }
    
    

    //hooks
    onMounted(() => {
      const pageArg = utils.getQueryString('page');
      page.value = utils.isEmpty(pageArg) ? 0 : parseInt(pageArg)
      
      loadMore() //加载动弹
      //获取token
      if (window.USER) {
        hasLogin.value = true;
        loginUser.value = window.USER
        //hiToken = null;
        // fetch(api.url.tokens, {
        //   method: "GET",
        // })
        //   .then((res) => {
        //     if (res.ok) {
        //       // 此处加入响应状态码判断
        //       return res.json();
        //     } else {
        //       throw Error(res.statusText);
        //     }
        //   })
        //   .then((response) => {
        //     hiToken = response.data.token;            
        //   })
        //   .catch((err) => {
        //     errorMsg = "出错了：" + err.message;
        //     Msg.error(errorMsg);
        //   });

      } else {

        const hiData = JSON.parse(localStorage.getItem("hiData"));
        if (
          hiData == undefined ||
          hiData.token == undefined ||
          hiData.expires == undefined ||
          hiData.user == undefined
        ) {
          return;
        }

        if (hiData.expires - utils.time() < 0) {
          //过期
          localStorage.removeItem("hiData");
          hasLogin.value = false;
        } else {
          hasLogin.value = true;
          hiToken = hiData.token;
          //console.log(hiData.user);
          loginUser.value = hiData.user;
        }
      }

      
    });


    const loadMoreNoResult = ref(false)
    const loadMoreMessage = ref('');

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

      uploadingImages,
      tweetSending,
      tweetSendSucess,

      pubBubbles,
      handleBubbleDelete,
      loginUser,
      loadMore,
      logoutUrl,

      loadMoreNoResult,
      loadMoreMessage,
      
    };
  },
};
</script>

<style src="@/assets/global.css"></style>


