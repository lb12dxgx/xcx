import Vue from 'vue'
import App from './index'


const app = new Vue(App)
app.$mount()


export default {
  // 这个字段走 app.json
  config: {
    tabBar: {
      "color": "#202020",
      "selectedColor": "#ec5045",
      "list": [{
        "pagePath": "pages/index/main",
        "text": "首页1",
        "iconPath": "/static/img/shouye1.png",
        "selectedIconPath": "/static/img/shouye2.png"},{
        "pagePath": "pages/mail/list/main",
        "text": "商城1",
        "iconPath": "/static/img/shangcheng1.png",
        "selectedIconPath": "/static/img/shangcheng2.png"
      },{
        "pagePath": "pages/my/main",
        "text": "我的1",
        "iconPath": "/static/img/wode1.png",
        "selectedIconPath": "/static/img/wode2.png"
      }]
    },
  }
}
 



