import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueSelect from 'vue-select'
import "vue-select/dist/vue-select.css"
import { MonthTogglePicker } from './components'


createApp(App)
    .component("v-select", VueSelect)
    .component("MonthTogglePicker", MonthTogglePicker)
    .mount('#app')
