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
        preShareCode:''
      }
     
    }
   
  },
 
  methods: {
   
   saveAnswer(){

    if(this.addForm.content==''){
          wx.showToast({
            title: '请填写内容',
            duration: 2000
          });
          return false;
    };

    saveAnswer(this.addForm).then((res)=>{
        wx.redirectTo({
          url: '/pages/sns/listProblem/main'
      })
    })
   },


  
 },



  
  onUnload(){
     this.addForm={
          content:'',
          problemId:'',
          preShareCode:''
        };
      
  },

  onLoad() {
      let query=this.$root.$mp.query;
      this.addForm.problemId=query.problemId
      getProblem({'problemId':query.problemId}).then((res)=>{
        this.addForm.preShareCode=res.retData.shareCode;
      })

  },



}

</script>

<style scoped>

</style>
