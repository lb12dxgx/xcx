<template>
  <div class="frome-box" style="margin-top:0px">
      <div class="frome-content">
        <div class="problemPersonName">
            {{addForm.personName}}
        </div>
        <div class="problemEnterpriseName">
            {{addForm.enterpriseName}}|{{addForm.personPosition}}
        </div>
        <div class="problemTitle">
            {{addForm.title}}
        </div>
        <div class="problemContent">
            {{addForm.content}}
        </div>
        <div class="weui-uploader__bd th-backwhite clearfix">
            <div class="weui-uploader__files" id="uploaderFiles">
              <block v-for="(item,index) in files" :key="index">
                <div class="weui-uploader__file posi-rela":id="item">
                  <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
                </div>
              </block>
            </div>
        </div>
         <div class="problemEndTime">
            {{addForm.endTime}}
         </div>

         <div class="problemNum">
            <span class="viewNum">{{addForm.viewNum}}  围观</span>
            <span class="answerNum">{{addForm.answerNum}}  回答</span>
         </div>

        
      

        <div class="problemButton">
          <button type="primary"  class="shareLButton" @click="handle"> 解决问题 </button>
          <button type="primary" class="shareRButton" @click="showPop" >分享</button>
        </div>
    </div>

  <div :class="popContainer" @click="hiddenPop" v-if="popContainer!=''">
  </div>
  <div :class="popPick" v-if="popPick!=''" >
    <div class="popImg">
      <img :src="popImgUrl" style="width:298px;height:400px"></img>
    </div>
   
      <button type="primary" class="shareLButton" open-type="share"  > 分享好友 </button>
      <button type="primary" class="shareRButton" @click="downLoadJpg" > 分享朋友圈 </button>
  </div>

</div>
</template>

<script>
import {getProblem,getFileList,createShareImg,url} from '../../../api/api';

export default {

data () {
    return {
        addForm:{
          problemId:'',
          title:'',
          content:'',
          giftId:'',
          giftName:'',
          giftNum:'',
          dayNum:3,
          picId:'',
          shareCode:''
        },
        files:[],
        popContainer:'',
        popPick:'',
        popButPick:'',
        popImgUrl:''

    }
   
  },
 
  methods: {
   
   hiddenPop(){
    this.popContainer="";
    this.popPick="";
    this.popImgUrl="";
   },

   hiddenPopButton(){
     this.popContainer="";
     this.popButPick="";
     this.onShareAppMessage();
   },

   showPopButton(){
     this.popContainer="popContainer";
     this.popButPick="popButPick";
   },

   showPop(){
      
     var openid=wx.getStorageSync('openid');
      console.log("openid="+openid);
      if(openid==''){
          wx.switchTab({
            url: '/pages/my/main'
          });
         return;
      }

    this.popContainer="popContainer";
    this.popPick="popPick";
    let sharePath='pages/sns/viewProblem/main';
    var imgCreate={'shareCode':this.addForm.shareCode,'problemId':this.addForm.problemId,'sharePath':sharePath};
    createShareImg(imgCreate).then((res)=>{
      this.popImgUrl=url+res.retData;
    });
   
   },

   downLoadJpg(){
       var _this=this;
      wx.downloadFile({
        url:this.popImgUrl,
        success: function(res) {
          if (res.statusCode === 200) {
            let img = res.tempFilePath;
            wx.saveImageToPhotosAlbum({
                filePath: img,
                success(res) {
                  _this.hiddenPop();
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  });
                },
                fail(res) {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'success',
                    duration: 2000
                  });
                }
            });
          }
        }

      });
   },
    handle(){
      var openid=wx.getStorageSync('openid');
      console.log("openid="+openid);
      if(openid==''){
          wx.switchTab({
            url: '/pages/my/main'
          });
         
      }else{
       wx.navigateTo({
              url: '/pages/sns/handleProblem/main?problemId='+this.addForm.problemId
        })
      }
    }

  
 },

onShareAppMessage: function (e) {
    this.popButPick="";
    return {
      title: '地下管线',
      path: '/pages/sns/viewProblem/main?shareCode='+this.addForm.shareCode,
      imageUrl:this.popImgUrl,
      success:(res) => {
        console.log("转发成功", res);
      },
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
        };
       this.files=[]
      
  },

  onLoad() {
      let problemId=this.$root.$mp.query.problemId;
      getProblem({'problemId':problemId}).then((res)=>{
        this.addForm=res.retData;
        getFileList({'bussinessId':query.problemId}).then((res)=>{
          this.files=res.retData;
        })
      })
   },



}

</script>

<style scoped>
.problemPersonName{
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.problemEnterpriseName{
  text-align: center;
  font-size: 12px;
}
.problemTitle{
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.problemContent{
  font-size: 14px;
  padding: 10px;
}
.problemEndTime{
   line-height: 30px;
   font-size: 14px;
   color:red;
   background-color:#f3f3f3;
   text-align: center;
   margin: 10px 30px; 
}

.problemNum{
  border-bottom: 1px solid #f3f3f3;
  padding-bottom:10px;
  font-size: 14px;
  width: 100%
}

.problemNum .viewNum{
  margin-left: 20px;
}

.problemNum .answerNum{
  float: right;
  margin-right:60px;
}


.problemButton{
  margin-top:10px;
}

 .problemButton .shareLButton{
  float:left;
  margin-left:40px
 }

 .problemButton .shareRButton{
  float:right;
  margin-right:40px
 }


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
  left:10%; 
  bottom:5%;
  width:80%; 
  overflow:scroll;
  z-index:9999;
  background: rgb(256,256,256);
}
.popImg{
  border:1px solid #f3f3f3;
}


.popPick .shareLButton{
  float:left;
  margin-left:20px;
  margin-top:10px;
  margin-bottom:10px;
 }

 .popPick .shareRButton{
  float:right;
  margin-right:20px;
  margin-top:10px;
  margin-bottom:10px;
 }

</style>
