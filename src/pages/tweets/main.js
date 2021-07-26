import App from './App.vue'

//import Varlet from '@varlet/ui'



import { createApp } from 'vue'
import {Uploader,Input,Button,Icon,Cell,Chip} from '@varlet/ui'
//import '@varlet/ui/es/style.js' //按需引入

//createApp(App).use(Uploader).use(Input).use(Button).mount('#app')
createApp(App)
.use(Uploader)
.use(Input)
.use(Button)
.use(Icon)
.use(Cell)
.use(Chip)
.mount('#app')


