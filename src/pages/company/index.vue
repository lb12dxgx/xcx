<template>
  
  <div >
    <div class="step1" v-if="step1">
        <div class="weui-cells__title">请选择身份</div>
        <div class="weui-cells ">
            <radio-group class="radio-group" @change="radioChange">
                    <div class="radio radioDiv" v-for="(item, index) in items" :key="item.name">
                      <radio :value="item.name" :checked="item.checked"/> {{item.value}}
                    </div>
            </radio-group>
        </div>

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStep2()" >下一步</a> 
    </div>

     <div class="step21" v-if="step21">
        <div class="weui-cells">
          <input class="weui-input" type="text" placeholder="请输入权属单位名称"style="width:70%" >
        </div>

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="SearchQs()" >查询</a> 
         <div class="weui-cells__title">请选择权属单位</div>
        <div class="weui-cells ">
            <radio-group class="radio-group" @change="radioChange">
                    <div class="radio radioDiv" v-for="(item, index) in qsitems" :key="item.name">
                      <radio :value="item.name" :checked="item.checked"/> {{item.value}}
                    </div>
            </radio-group>
        </div>

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStep3()" >下一步</a> 
    </div>

    <div class="step22" v-if="step22">
        <div class="weui-cells__title">请所属建设单位</div>
        <div class="weui-cells ">
            <radio-group class="radio-group" @change="radioChange">
                    <div class="radio radioDiv" v-for="(item, index) in items" :key="item.name">
                      <radio :value="item.name" :checked="item.checked"/> {{item.value}}
                    </div>
            </radio-group>
        </div>

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStep3()" >下一步</a> 
    </div>

  </div>
 

</template>

<script>





export default {
  data () {
    return {
       items: [
        {name: '1', value: '权属单位',checked: 'true'},
        {name: '2', value: '建设单位',}
      ],
      qsitems: [
        {name: '1', value: '权属单位1',},
        {name: '2', value: '权属单位2',},
        {name: '3', value: '权属单位3',},
        {name: '4', value: '权属单位4',},
        {name: '5', value: '权属单位5',},
      ],
      step1:true,
      step22:false,
      step21:false,
      addForm:{
        type:1,
      },
    }
     
  },


  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value);
      this.addForm.type=e.target.value
    },
    toStep2(){
       console.log("dd"+this.addForm.type)
      this.step1=false;

      if(this.addForm.type==1){
        this.step21=true;
      }else{
         this.step22=true;
      }
    },
    toStep3(){
      wx.setStorageSync("type",this.addForm.type);
      wx.navigateTo({
        url: '/pages/before/main'
     })
    }
    
 },

  onShow() {
    
   }
}

</script>

<style scoped>
  .radioDiv{
    margin:10px 0px;

  }


</style>
