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

        
          <div class="gift">
             <div class="giftTitle">
                悬赏礼品  <span class="giftName">{{addForm.giftName}}</span>
             </div>
             <div class="giftContent">
                <div class="giftMoney">{{addForm.money}}</div>
                <div class="giftName">{{addForm.giftName}}</div>
             </div>
             <div class="giftBottom">
                <div class="giftBottomMoney">
                  <span class="answerMoney">80%</span>
                  <span class="shareMoney">20%</span>
                </div>
                <div class="giftBottomDesc">
                  <span class="answerDesc">成功解决奖</span>
                  <span class="shareDesc">传播有功奖</span>
                </div>
             </div>    
          </div>

        <div class="problemButton">
        <button type="primary" open-type="share" class="shareLButton"> 解决问题 </button>
        <button type="primary" class="shareRButton" @click="showPop"> 分享 </button>
        </div>
    </div>

  <div :class="popContainer" @click="hiddenPop" v-if="popContainer!=''">
  </div>
  <div :class="popPick" v-if="popPick!=''" >
    <div class="popImg">
      <img :src="popImgUrl" style="width:300px;height:400px"></img>
    </div>
    <button type="primary" @click="downLoadJpg" style="width:30%;margin-top:10px;margin-bottom:10px">下载</button>
  </div>

</div>
</template>

<script>
import {getProblem,getFileList} from '../../../api/api';

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
          picId:''
        },
        files:[],
        popContainer:'',
        popPick:''

    }
   
  },
 
  methods: {
   
   hiddenPop(){
    this.popContainer="";
    this.popPick="";
   },
   showPop(){
    this.popContainer="popContainer";
    this.popPick="popPick";
   },

  
 },

onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
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
     let query=this.$root.$mp.query;
     query.problemId="f1861019-4248-4e2c-bcfe-4b44f1ea5c19";
     console.log(query.problemId);
  
    getProblem({'problemId':query.problemId}).then((res)=>{
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
.gift{
   border: 1px solid #f3f3f3;
   padding: 10px;
}

.gift .giftTitle{
   font-size: 16px;
   font-weight: bold;
}

.gift .giftTitle .giftMoney{
   font-size: 16px;
   font-weight: bold;
   color: red;
}
.gift .giftContent{
  text-align: center;
}

.gift .giftContent .giftMoney{
  margin-top: 80px;
  font-size: 16px;
  color: red;
}

.gift .giftContent .giftName{
  font-size: 12px;
 
}

.giftBottom{
  margin-top: 100px;
}

.giftBottom .giftBottomMoney{
  text-align: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.giftBottom .giftBottomMoney .answerMoney{
  margin-right: 120px;
}

.giftBottom .giftBottomMoney .shareMoney{
  margin-left: 120px;
}


.giftBottom .giftBottomDesc{
  text-align: center;
}

.giftBottom .giftBottomDesc .answerDesc{
  margin-right: 100px;
}

.giftBottom .giftBottomDesc .shareDesc{
  margin-left: 100px;
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
  bottom:10%;
  width:80%; 
  overflow:scroll;
  z-index:9999;
  background: rgb(256,256,256);
}
.popImg{
  border:1px solid #f3f3f3;
}

</style>
