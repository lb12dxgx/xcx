<template>
  
  <div >
    <div class="step" v-if="step">
        <div class="weui-cells__title">所在城市</div>
        <div class="weui-cells ">
            {{province}}{{city}}{{district}}
        </div>

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStep1()" v-if="exitCity" >下一步</a>  <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStep1()" v-if="!exitCity" >城市开通</a>
    </div>

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

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStepQs()" >下一步</a> 
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

         <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toStepJs()" >下一步</a> 
    </div>

  </div>
 

</template>

<script>
import {getCityByMap} from '../../api/api';




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
      province:'',
      city:'',
      district:'',
      exitCity:true,
      step:true,
      step1:false,
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
    toStep1(){
      this.step1=true;
      this.step=false;
    },
    toStep2(){
       console.log("dd"+this.addForm.type)
      this.step1=false;
      this.step=false;

      if(this.addForm.type==1){
        this.step21=true;
      }else{
         this.step22=true;
      }
    },
    toStepJs(){
      wx.setStorageSync("type",this.addForm.type);
      wx.navigateTo({
        url: '/pages/before/js/main'
     })
    },

    toStepQs(){
      wx.setStorageSync("type",this.addForm.type);
      wx.navigateTo({
        url: '/pages/before/qs/main'
     })
    },
    
 },

	 onUnload(){
	 	this.step=true;
	    this.step1=false;
	    this.step22=false;
	    this.step21=false;
	},

  onLoad() {
  	  this.step1=false;
      this.step=true;
     var _this=this;
     wx.getSetting({
      success(res) {
       if (!res['scope.userLocation']||!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation', 
            success(res) {
              console.log(res)
            },
            fail(r) { console.log(r)},
            complete() { }
          })
        }
      }
    });

    wx.getLocation({
      type: 'gcj02', 
        success(res) {
          getCityByMap({'longitude':res.longitude,'latitude':res.latitude}).then((res)=>{
           var province=res.retData.province;

           if("北京市"==province||"天津市"==province||"上海市"==province||"重庆市"==province){
             _this.province="";
           }else{
            _this.province=province;
           }
         
          _this.city=res.retData.city;
           _this.district=res.retData.district;
       });
          
        },
        fail(re){
          console.log(re);
        }
      });
   
    
   }
}

</script>

<style scoped>
  .radioDiv{
    margin:10px 0px;

  }


</style>
