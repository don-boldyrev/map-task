import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/muller-font.css'
import 'normalize.css/normalize.css'
import '@/assets/css/icon-classes.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
