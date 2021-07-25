<template>    
  <Modal />
  
</template>

<script>

import Modal from '@/components/Modal.vue'

export default {

  name: 'App',
  components: {
    Modal,
  },
  data() {
    return {
      title: "Hello Modal"
    }
  },
  methods: {
   
  },
}
</script>


<style>

</style>
