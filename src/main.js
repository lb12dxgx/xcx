import Vue from 'vue'
import App from './App'

import './css/weui.css'
import './css/weui_ext.css'
import './css/base.css'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
