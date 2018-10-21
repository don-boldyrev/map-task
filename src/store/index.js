import Vue from 'vue'
import Vuex from 'vuex'
import places from './places'
import stations from './stations'
import checkins from './checkins'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        places,
        stations,
        checkins
    }
})
