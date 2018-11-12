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
            <span class="viewNum">{{addForm.viewNum}}围观</span>
            <span class="answerNum">{{addForm.answerNum}}回答</span>
         </div>

        
          <div class="gift">
             <div class="giftTitle">
                悬赏礼品
             </div>
             <div class="giftContent">
                <div class="giftMoney">{{addForm.money}}</div>
                <div class="giftName">{{addForm.giftName}}</div>
             </div>
             <div class="giftBottom">
                <div class="giftBottomMoney">
                  <span class="answerMoney">8</span>
                  <span class="shareMoney">2</span>
                </div>
                <div class="giftBottomDesc">
                  <span class="answerDesc">成功解决奖</span>
                  <span class="shareDesc">传播有功奖</span>
                </div>
             </div>    
          </div>

        <div >
        <button type="primary" open-type="share" class="shareButton"> 分享给朋友 </button>
        <button type="primary" class="shareButton"> 分享朋友圈 </button>
        </div>
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
        files:[]

    }
   
  },
 
  methods: {
    shareFriend(){

    },

   shareGroup(){

    },
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
     query.problemId="a282732d-1b68-4a2a-a4db-010e46091fc8";
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
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
}
.problemEnterpriseName{
  text-align: center;
  font-size: 16px;
  padding: 5px;
}
.problemTitle{
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
}
.problemContent{
  font-size: 14px;
  padding: 5px;
}
.problemEndTime{
   font-size: 14px;
   color:red;
   background-color:#333333;
   margin: 0 10px; 
}
 .shareButton{
  width:40%;
  float:left;
  margin-left:10px
 }

</style>
