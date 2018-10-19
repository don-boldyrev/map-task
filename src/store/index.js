import Vue from 'vue'
import Vuex from 'vuex'
import places from './places'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        places
    }
})
