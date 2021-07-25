import App from './App.vue'
//import {Uploader,Input,Button} from '@varlet/ui'
import Varlet from '@varlet/ui'
import { createApp } from 'vue'
import '@varlet/ui/es/style.js'

//createApp(App).use(Uploader).use(Input).use(Button).mount('#app')
createApp(App).use(Varlet).mount('#app')


