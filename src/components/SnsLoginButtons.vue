<template>
  
    <a
      class="thirdPartyLogin w3-btn w3-round w3-white w3-padding-large"
      :href="API_URL + '/oauth/oschina'"
    >
      <img
        :src="API_URL + '/images/logo/osc.svg'"
        class="socail-logo osc-logo"
        width="24"
      />
      OSChina登录
    </a>

    <a
      class="thirdPartyLogin w3-btn w3-round w3-white w3-padding-large"
      :href="API_URL + '/oauth/weibo'"
    >
      <img
        :src="API_URL + '/images/logo/weibo.jpeg'"
        class="socail-logo weibo-logo"
        width="24"
      />
      微博登录
    </a>
    <a
      class="thirdPartyLogin w3-btn w3-round w3-white w3-padding-large"
      :href="API_URL + '/oauth/github'"
    >
      <img
        :src="API_URL + '/images/logo/social_github.png'"
        class="socail-logo github-logo"
        width="20"
      />

      Github登录
    </a>
  <a class="thirdPartyLogin w3-btn w3-round w3-white  w3-padding-large" :href="API_URL + '/oauth/google'">

                                    <img :src="API_URL + '/images/logo/google.png'" class="socail-logo google-logo" width="22">

                                    Google登录
                                </a>
</template>

<script>
export default {
  props: ["API_URL"],
};
</script>

