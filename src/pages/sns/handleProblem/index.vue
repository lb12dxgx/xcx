<template>
  <div class="frome-box" style="margin-top:0px">
    <div class="frome-content">
        <div class="text-box ">
          <textarea  v-model="addForm.content" rows="4" style="border-bottom:0.5px solid #ddd; " />
        </div>
        
    </div>
    <button type="primary"  @click="saveAnswer" style="width:50%;margin-top:10px" >提交</button>
  </div>
  
</template>

<script>
import {saveAnswer,getProblem } from '../../../api/api';

export default {

data () {
    return {
      addForm:{
        content:'',
        problemId:'',
        shareCode:''
      }
     
    }
   
  },
 
  methods: {
   
   saveAnswer(){
    saveAnswer(this.addForm).then((res)=>{
        wx.redirectTo({
          url: '/pages/sns/viewProblem/main?shareCode='+this.addForm.shareCode
      })
    })
   },


  
 },



  
  onUnload(){
     this.addForm={
          content:'',
          problemId:'',
          shareCode:''
        };
      
  },

  onLoad() {
      let query=this.$root.$mp.query;
      this.addForm.problemId=query.problemId
      getProblem({'problemId':query.problemId}).then((res)=>{
        this.addForm.shareCode=res.retData.shareCode;
      })

  },



}

</script>

<style scoped>

</style>
