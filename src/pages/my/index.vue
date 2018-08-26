<template>
  
  <div class="my">
    <div class="my-head">
       <div >
        <img :src="userInfo.avatarUrl" />
       </div>
       <div class="my-name">
         {{userInfo.nickName}}
       </div> 
    </div>
     <div class="my-reg">
       <div class="weui-cell weui-cell_vcode">
                  <div class="weui-cell__hd">
                      <label class="weui-label">手机号</label>
                  </div>
                  <div class="weui-cell__bd">
                      <input class="weui-input" type="tel" placeholder="请输入手机号">
                  </div>
                  <div class="weui-cell__ft">
                      <button class="weui-vcode-btn">获取验证码</button>
                  </div>
      </div>
       <div class="weui-cell weui-cell_vcode">
                  <div class="weui-cell__hd">
                      <label class="weui-label">验证码</label>
                  </div>
                  <div class="weui-cell__bd">
                      <input class="weui-input" type="tel" placeholder="请输入验证码">
                  </div>
            
      </div>
    </div>
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
      console.log("----");
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
              console.log(res.userInfo);
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

   mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .my{
    margin-top:5px;
    text-align: center;
   
  }
  .my-head{
     background-color: #fff;
  }
  .my img{
    width: 100px;
    height: 100px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%
   }
  .my .my-name{
    font-size: 16px;
    margin: 0px 10px;
    padding:10px 10px;
  /*  border-bottom:1px solid #ccc;*/
  }
  .my-reg{
    margin-top:10px; 
    background-color: #fff;
  }

</style>
