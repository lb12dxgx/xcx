<template>
  <div class="frome-box" style="margin-top:0px">

      <div class="frome-content">
        <div class="resultGroup" v-for="(item,index) in list" :key="index">
            <div class="resultHead">
            </div>
            <div class="resultLine">
            </div>
            <div class="resultItem">
              <div class="resultPersonName">
                {{item.personName}}
              </div>
              <div class="resultBottom">
                <span class="resultEnterpriseName">
                 {{item.enterpriseName}}|{{item.personPosition}}
                </span>
                <span class="resultScoreNum}">积分：{{item.scoreNum}}</span>
                <span class="resultCreateDate}">{{item.createDate}}</span>
              </div>
            </div>
            <div class="resultItem" v-if="item.twoResult!=null">
              <div class="resultPersonName">
                {{item.twoResult.personName}}
              </div>
              <div class="resultBottom">
                <span class="resultEnterpriseName">
                 {{item.twoResult.enterpriseName}}|{{item.twoResult.personPosition}}
                </span>
                <span class="resultScoreNum}">积分：{{item.twoResult.scoreNum}}</span>
                <span class="resultCreateDate}">{{item.twoResult.createDate}}</span>
              </div>
            </div>
            <div class="resultItem" v-if="item.threeResult!=null">
              <div class="resultPersonName">
                {{item.threeResult.personName}}
              </div>
              <div class="resultBottom">
                <span class="resultEnterpriseName">
                 {{item.threeResult.enterpriseName}}|{{item.threeResult.personPosition}}
                </span>
                <span class="resultScoreNum}">积分：{{item.threeResult.scoreNum}}</span>
                <span class="resultCreateDate}">{{item.threeResult.createDate}}</span>
              </div>
            </div>
        </div>  

      </div>
  </div> 
</template>

<script>
import {getResultByProblemId} from '../../../api/api';

export default {

data () {
    return {
        list:[],
     }
   
  },
 
  methods: {
   
 },



  
  onUnload(){
    this.list=[];
  },

  onLoad() {
      let problemId=this.$root.$mp.query.problemId;
      getResultByProblemId({'problemId':problemId}).then((res)=>{
        this.list=res.retData;
      })
   },



}

</script>

<style scoped>

.resultGroup{
  width: 100%;
}

.resultLine{
  width: 15%;
  border-top:2px solid red;
  
}

.resultHead{
  width: 100%;
  height: 20px;
  background-color:#f3f3f3;
}

.resultItem{
  margin:5px 5px 0px 5px;
  border-bottom:1px solid #f3f3f3;
  width: 100%;
}

.resultItem .resultPersonName{
  font-size: 16px;
  
}


.resultItem .resultBottom .resultEnterpriseName{
  margin-left: 10px;
  font-size: 14px;
  color: #b4b4b4;
}

.resultItem  .resultBottom .resultScoreNum{
  margin-left: 10px;
  font-size: 14px;
  color: #b4b4b4;
}

.resultItem  .resultBottom .resultCreateDate{
  margin-left: 10px;
  font-size: 14px;
  color: #b4b4b4;
}



</style>
