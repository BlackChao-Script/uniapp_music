import Vue from 'vue'
import App from './App'
import {
	apiRequest
} from "./util/api.js"
import store from './store'
Vue.prototype.$store = store
Vue.prototype.apiRequest = apiRequest
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
