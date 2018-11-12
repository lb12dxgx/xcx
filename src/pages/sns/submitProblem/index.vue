<template>
  <div class="frome-box" style="margin-top:0px">
  
      <div class="tab-list">
          <ul>
            <li>
              <a  class="link-on" @click="goStep1">寻找帮助</a>
            </li>
            <li>
              <a   class="link-none" @click="goStep2">我的问题</a>
            </li>
             <li>
              <a   class="link-none" @click="goStep3">问题大厅</a>
            </li>
             <li>
              <a   class="link-none" @click="goStep4">我参与的</a>
            </li>
          </ul>
      </div>
      <div class="clear"></div>
      <div class="frome-content">
        <div class="text-box ">
          <input  type="text" v-model="addForm.title"/>
          <label class="lablefocus">问题标题</label>
        </div>
        <div class="text-box ">
          <textarea v-model="addForm.content" style="height:60px"></textarea>
          
          <label class="lablefocus">问题内容</label>
        </div>

        <div class="text-box" @click="showPop()">
            <input  type="text" v-model="addForm.giftName" disabled="true"/>
            <label class="lablefocus">礼物用于解决问题和传播的人</label>
        </div>
        <div class="text-box" v-if="addForm.giftNum!=''">
          <input  type="text" v-model="addForm.giftNum"/>
          <label class="lablefocus">数量</label>
        </div>
        <div class="weui-cells__title">问题有效期{{addForm.dayNum}}天</div>
         <div class="weui-cells ">
            <slider @change="sliderchange" step="1" min="1" max="5" :value="addForm.dayNum" />
            <span style="margin-left:10px;font-size:12px">1天</span> 
            <span style="float:right;margin-right:10px;font-size:12px"> 5天</span>
        </div>

        <div class="weui-uploader__bd th-backwhite clearfix">
            <div class="weui-uploader__files" id="uploaderFiles">
              <block v-for="(item,index) in files" :key="index">
                <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
                  <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index,item.fileInfoId)"/>
                  <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
                </div>
              </block>
            </div>
            
        </div>
       
          <div class="weui-cells ">
            <a  class="weui-cell weui-cell_access" @click="chooseImage">
              <div class="weui-cell__bd">
                <p>图片</p>
              </div>
                <div class="weui-cell__ft">
              </div>
            </a>
          </div>
          <div class="tj-btn" @click="save" 
          style="text-align:center;line-height:50px">
            {{btnstr}}
          </div>
      </div>
  

  <div :class="popContainer" @click="hiddenPop" v-if="popContainer!=''">
  </div>
  <div :class="popPick" v-if="popPick!=''" >

    <div class="weui-panel weui-panel_access" style="margin-top:20px">
      <div class="weui-panel__bd">
          <a  class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in list" :key="index" @click="addGift(index)">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.smailPicUrl" alt="">
            </div>
            <div class="weui-media-box__bd  weui-cell_primary">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
              <p class="weui-media-box__desc">{{item.price}}</p>
              <p class="weui-media-box__desc">{{item.spec}}</p>
             </div>
          </a>
      </div>
    </div>
  </div>


  </div>
</div>
</template>

<script>
import {giftList,deleteFile,addProblem,saveProblem,url,wxPay} from '../../../api/api';


export default {

data () {
    return {
        addForm:{
          title:'',
          content:'',
          giftId:'',
          giftName:'',
          giftNum:'',
          dayNum:3,
          picId:''
        },
        rechargeRecord:{
          businessType:1,
          businessContent:"",
          money:""
        },

        files:[],
        price:'',
        list:[],
        popContainer:"",
        popPick:""

    }
   
  },
  computed: {
    // 计算属性的 getter
    btnstr: function () {
      if(this.price==""){
        return "发布";
      }else{
        return "支付"+this.price*this.addForm.giftNum+"元发布";
      }
      
    }
  },

  methods: {
  
   goStep1(){
      wx.redirectTo({
        url: '/pages/sns/submitProblem/main'
      })
    },

    goStep2(){
      wx.redirectTo({
        url: '/pages/sns/myProblem/main'
      })
    },

    goStep3(){
      wx.redirectTo({
        url: '/pages/sns/listProblem/main'
      })
    },

    goStep4(){
      wx.redirectTo({
        url: '/pages/sns/shareProblem/main'
      })
    },

   sliderchange(e){
    this.stepvalue=e.mp.detail.value;
   },
   hiddenPop(){
    this.popContainer="";
    this.popPick="";
   },
   showPop(){
    this.popContainer="popContainer";
    this.popPick="popPick";
   },
   addGift(index){
      this.addForm.giftId=this.list[index].giftId;
      this.addForm.giftName=this.list[index].name;
      this.addForm.giftNum=1;
      this.price=this.list[index].price;
      this.hiddenPop();
   },


   chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        wx.uploadFile({
            url: url+'/xcx/sns/uploadImg.xcx', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData:{
              'openIdMd5': wx.getStorageSync('openid'),
              'picId':_this.addForm.picId
            },
            success: function(res){
             var fileArray=JSON.parse(res.data);
             var fileJsonArray=[];
             for(var file of fileArray.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                fileJsonArray.push(fileJson);
             }
              _this.files=fileJsonArray;
            }
        })
        },
        fail: function (f) {
          console.log(f);
        },
        complete: function () {
          console.log("1111");
        }
      })
    },

    predivImage(e) {
    
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index,fileInfoId){
     deleteFile({'fileInfoId':fileInfoId,'openIdMd5':wx.getStorageSync('openid')}).then((res)=>{
        var fileJsonArray=[];
        for(var file of res.retData){
            var fileJson={};
            fileJson.webPath=url+"/"+file.fileWebPath
            fileJson.fileInfoId=file.fileInfoId
            fileJsonArray.push(fileJson);
        }
        this.files=fileJsonArray;
      
     })
      
    },

    save(){
      saveProblem(this.addForm).then((res)=>{
         let businessContent = res.retData.problemId;
         let money = res.retData.money;
         this.rechargeRecord.businessContent=businessContent;
         //this.rechargeRecord.money=money;
         this.rechargeRecord.money=0.01;
         wx.redirectTo({
            url: '/pages/sns/shareProblem/main?problemId='+businessContent
        })
         /*wxPay(this.rechargeRecord).then((res)=>{
           var _this=this;
            wx.requestPayment({
                    timeStamp: res.retData.timeStamp,
                    nonceStr: res.retData.nonceStr,
                    package: res.retData.package,
                    signType: 'MD5',
                    paySign: res.retData.paySign,
                    success: function (res) {
                      // success
                      console.log(res);
                      _this.goStep2();
                    },
                    fail: function (res) {
                      // fail
                      console.log(res);
                    },
                    complete: function (res) {
                      // complete
                      console.log(res);
                    }
                  })
         })*/
      })
    }

   
 },



  onUnload(){
     this.addForm={
          title:'',
          content:'',
          giftId:'',
          giftName:'',
          giftNum:'',
          dayNum:'',
          picId:''
        },
       this.files=[],
       this.price='',
       this.list=[],
       this.popContainer="",
       this.popPick=""
      
  },

  onLoad() {
     giftList().then((res)=>{
        this.list=res.retData
     });
     addProblem().then((res)=>{
       this.addForm.picId=res.retData.picId;
     })
  },



}

</script>

<style scoped>
 .popContainer{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:19;
  bottom: 0;
  background: rgba(0,0,0,0.3);
}

.popPick{
  position:fixed; 
  left:0px; 
  bottom:0px;
  width:100%; 
  height:200px; 
  overflow:scroll;
  z-index:9999;
  background: rgb(256,256,256);
}

.tab-list ul li{
  list-style: none;
  float: left;
  width: 23%;
}

.link-on{
  font-size: 16px
}

.link-none{
  font-size: 16px
}

</style>
