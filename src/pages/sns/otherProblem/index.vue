<template>
  <div class="frome-box" style="margin-top:0px">
    <div class="tab-list">
          <ul>
            <li>
              <a  class="link-none" @click="goStep1">寻找帮助</a>
            </li>
            <li>
              <a   class="link-none" @click="goStep2">我的问题</a>
            </li>
             <li>
              <a   class="link-none" @click="goStep3">问题大厅</a>
            </li>
             <li>
              <a   class="link-on" @click="goStep4">我参与的</a>
            </li>
          </ul>
      </div>
      <div class="clear"></div>
      <div class="problem-item" v-for="(item,index) in list" :key="index">
          <a @click="view(item.problemId)">
            <div class="problem-head">
              <span class="problem-personName">{{item.personName}}</span>
              <div class="problem-enterpriseName">
                  {{item.enterpriseName}}
              </div>
              <span class="problem-state">{{statMap[item.state]}}</span>
            </div>
            <div class="problem-title">{{item.title}}</div>
            <div class="problem-content">{{item.content}}</div>
            <div class="problem-bottom">
              <span class="problem-viewNum">围观：{{item.viewNum}}</span>
              <span class="problem-answerNum">回答：{{item.answerNum}}</span>
               <span class="problem-createDate">{{item.createDate}}</span>
              <span class="problem-giftName">{{item.giftName}}</span>
            </div>
          </a>
      </div>
  </div>
    
</template>

<script>


import {otherProblem} from '../../../api/api';


export default {
  data () {
    return {
     list:[],
     pageNum:0,
     total:0,
     statMap:{
      0:'进行中',
      1:'已解决 ',
      2:'已超时'
     }
    }
     
  },

  
  methods: {
    view(problemId){
      wx.navigateTo({
        url: '/pages/sns/viewAnswer/main?problemId='+problemId
      })
    },
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
        url: '/pages/sns/otherProblem/main'
      })
    },

    share(problemId){
      wx.navigateTo({
        url: '/pages/sns/shareProblem/main?problemId='+problemId
      })
    }


  },

  onReachBottom() {
    if(this.total>this.list.length){
      this.pageNum=this.pageNum+1
      otherProblem({'pageNum':this.pageNum}).then((res)=>{
        this.list=this.list.concat(res.retData.content);
      })
    }
  },

  onUnload(){
   this.list=[];
  },

  onLoad() {
   otherProblem().then((res)=>{
    this.list=res.retData.content;
    this.total=res.retData.totalElements;
   });
  }
}

</script>

<style scoped>
  
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

.problem-item a{
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
  float: left;
  width: 100%;
  background-color:#ffffff;
  
}

.problem-item .problem-head{
  line-height: 20px;
  padding:5px;
  color: #b4b4b4;
}

.problem-enterpriseName{
  float: left;
  margin-left:10px;
}
.problem-createDate{
  float: left;
  margin-left:10px;
}
.problem-personName{
  float: left;
  margin-left:10px;
}
.problem-state{
  float: right;
  margin-right:20px;
  color: red;
}

.problem-title{
  padding:5px;
  float: left;
  width: 100%;
  margin-left:10px;
}

.problem-content{
  float: left;
  width: 100%;
  margin-left:10px;
  border-bottom:0.5px solid #ddd
}

.problem-item .problem-bottom{
  padding:5px;
  color: #b4b4b4;
}

.problem-viewNum{
  float: left;
  margin-left:10px;
}

.problem-answerNum{
   float: left;
  margin-left:10px;
}
.problem-giftName{
  float: right;
  margin-right:20px;
}

</style>
