<template>
  
  <div>
    
    asdads
  </div>

</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      movies:[{'url':'/static/images/banner.jpg'},{'url':'/static/images/banner.jpg'}],
      pages:[{'url':'/static/images/shigu.png','name':'事故上报'},
              {'url':'/static/images/zhaobiao.png','name':'施工申请'},
              {'url':'/static/images/caigou.png','name':'行业资讯'},
              {'url':'/static/images/huiyi.png','name':'产业服务'},
              {'url':'/static/images/qiye.png','name':'工作必备'},
              {'url':'/static/images/chanpin.png','name':'知识库'}]

    }
  },


  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>


</style>
