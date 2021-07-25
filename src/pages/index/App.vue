<template>
  <img alt="Vue logo" src="@/assets/logo.png">
  <HelloWorld msg="Welcome to Index Page"/>
  <Modal />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Modal from '../../components/Modal.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,    
    Modal,
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
