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
         <div class="problemEndTime" v-if="addForm.state==0">
            {{addForm.endTime}}
         </div>
          <div class="problemEndTime" v-if="addForm.state==1">
            已结束
         </div>
          <div class="problemEndTime" v-if="addForm.state==2">
            超时结束
         </div>


         <div class="problemNum">
            <span class="viewNum">{{addForm.viewNum}}  围观</span>
            <span class="answerNum">{{addForm.answerNum}}  回答</span>
         </div>
         <div class="answerAction" v-if="list.length>0&&addForm.state==0">
             <a  @click="handleAdmin" v-if="itemArray.length==0"> 管理</a>
             <a  @click="handleCancel" v-if="itemArray.length>0"> 取消</a>
         </div>
        
         <div class="answerItem" v-for="(item,index) in list" :key="index">
            <div class="answerHead">
              <span class="answerPersonName">{{item.personName}}</span>
              <span class="answerEnterpriseName">
               {{item.enterpriseName}}|{{item.personPosition}}</span>
            </div>

            <div class="answerContent" @click="selectCheck(index)">
              <icon type="success" size="25" color="red" style="margin-right:5px"
              v-if="itemArray[index]==1" />
              <div class='icon_none' style="display:inline-block;margin-right:5px" v-if="itemArray[index]==0">
                
              </div>
              <div style="display:inline-block;margin-left:5px">
                {{item.content}}{{itemArray[index]}}
              </div>
            </div>
            <div class="answerBottom">
              {{item.createDate}}
            </div>
         </div>  
      </div>

        <div class="problemButton" v-if="addForm.state==0">
          <button type="primary" style="width:30%" @click="showPop" v-if="itemArray.length==0">
          分享
          </button>
          <button type="primary" style="width:30%" @click="save" v-if="itemArray.length>0">
           提交
          </button>
        </div>

         <div class="problemButton" v-if="addForm.state==1">
           <button type="primary" style="width:30%" @click="viewSucess">获奖名单</button>
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
import {getProblem,getAnswer,getFileList,createShareImg,url,saveResult} from '../../../api/api';

export default {

data () {
    return {
        list:[],
        addForm:{
          problemId:'',
          state:'',
          title:'',
          content:'',
          giftId:'',
          giftName:'',
          giftNum:'',
          dayNum:3,
          picId:'',
          shareCode:''
        },
        itemArray:[],
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

    handleAdmin(){
      var array=[];
      for(var i=0;i<this.list.length;i++){
          array[i]=0;
      }
        this.itemArray=array;
    },

     handleCancel(){
      this.itemArray=[];
    },

    selectCheck(index){
      var array=[...this.itemArray];
      if(this.itemArray[index]==null){
        return;
      }
      if(array[index]==0){
        array[index]=1
       }else{
        array[index]=0
      }
      this.itemArray=array;
      console.log(this.itemArray);
    },

    save(){
      var answerIdList=[];
      for(var i=0;i<this.itemArray.length;i++){
          if(this.itemArray[i]==1){
            var answerId=this.list[i].answerId;
            answerIdList.push(answerId);
          }
      }

      saveResult({'problemId':this.addForm.problemId,'answerIdList':answerIdList}).then((res)=>{
        wx.redirectTo({
          url: '/pages/sns/myProblem/main'
        })
      })
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
       this.files=[];
       this.list=[];
       this.itemArray=[];
      
  },

  onLoad() {
      let problemId=this.$root.$mp.query.problemId;
      getProblem({'problemId':problemId}).then((res)=>{
        this.addForm=res.retData;
        getAnswer({'problemId':problemId}).then((res)=>{
          this.list=res.retData;
        })
        getFileList({'bussinessId':problemId}).then((res)=>{
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

.answerAction{
  background-color:#f3f3f3;
  padding: 5px;
  border-top:1px solid red;
  height: 25px;
}

.answerAction a{
  color:#d80702;
  font-size:16px;
  padding-left: 10px;
}


.answerItem{
  margin:5px 5px;
  border-bottom:1px solid #f3f3f3;
  width: 100%;
}

.answerItem .answerHead{
  font-size: 12px;
  color: #b4b4b4;
}


.answerItem .answerHead .answerEnterpriseName{
  margin-left: 10px;
}

.answerItem  .answerContent{
  margin: 5px 5px;
}
.answerItem  .answerBottom{
  margin-left:80%;
  font-size: 12px;
  color: #b4b4b4;
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

 .icon_none{
  display:inline-block;
  width: 40rpx;
  height: 40rpx;
  border: 1rpx solid #d6d6d6;
  border-radius: 50%;
}

</style>
