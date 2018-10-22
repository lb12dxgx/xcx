<template>
  <div class="frome-box" >
    <div class="weui-cells__title">选择区域</div>
    <div class="frome-content" v-if="step1">
      <div class="weui-cells ">
        <a  class="weui-cell weui-cell_access" @click="goStep2()">
          <div class="weui-cell__bd">
              <p>区县</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <a  class="weui-cell weui-cell_access" @click="goStep3()">
          <div class="weui-cell__bd">
              <p>地区</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
    </div>
    <div class="frome-content" v-if="step2">
      <div class="weui-cells weui-cells_checkbox">
        <checkbox-group @change="checkDistrict">
          <label class="weui-cell weui-check__label" v-for="(item,index) in districtList" :key="index" >
            <div class="weui-cell__hd">
              <checkbox :data-name="index" :value="item.cityDistrictId" :checked="item.checked" @change="checkedDistrict" />
            </div>
            <div class="weui-cell__bd">
              <p>{{item.districtName}}</p>
            </div>
          </label>
        </checkbox-group>
         <input type="button" class="tj-btn" value="提交" @click="handleSaveDistrict()" />
      </div>
     </div>
    <div class="frome-content" v-if="step3">
      <checkbox-group @change="checkArea">
        <block v-for="(item,index) in areaList" :key="index">
          <div class="weui-cells__title" v-if="item.list.length>0">{{item.districtName}}</div>
          <label class="weui-cell weui-check__label" v-for="(it,ide) in item.list"  :key="ide">
            <div class="weui-cell__hd">
              <checkbox :value="it.cityAreaId" :checked="it.checked"/>
            </div>
            <div class="weui-cell__bd">
              <p>{{it.areaName}}</p>
            </div>
          </label>
        </block>
      </checkbox-group>
       <input type="button" class="tj-btn" value="提交" @click="handleSaveArea()" />
    </div>
  </div>
      
</template>

<script>
import {getDistrictByOpenId,saveDistrict,getAreaByOpenId,saveArea} from '../../../api/api';



export default {
 

  data () {
    return { 
      step1:true,
      step2:false,
      step3:true,
      districtList:[],
      areaList:[],
      cityDistrictIdList:[],
      cityAreaIdList:[]

     }
  },

  

  methods: {

  goStep1(){
    this.step1=true;
    this.step2=false;
    this.step3=false;
  },
  goStep2(){
    this.step1=false;
    this.step2=true;
    this.step3=false;
    getDistrictByOpenId().then((res)=>{
      this.districtList=res.retData;
    })
  },
  goStep3(){
    this.step1=false;
    this.step2=false;
    this.step3=true;
    getAreaByOpenId().then((res)=>{
      this.areaList=res.retData;
    })
  },

  checkDistrict(e){
    this.cityDistrictIdList=e.mp.detail.value;
    for(var district of this.districtList){
      var flag=false;
      for(var id of this.cityDistrictIdList){
        if(district.cityDistrictId==id){
            flag=true;
        }
      }
      district.checked=flag;
    }

  },

  checkArea(e){
    this.cityAreaIdList=e.mp.detail.value;
    console.log(e.mp.detail.value);
    for(var distrrict of this.areaList){
      for(var cityArea of distrrict.list){
        var flag=false;
        for(var id of this.cityAreaIdList){
         
            if(cityArea.cityAreaId==id){
                flag=true;
            }
          }
        cityArea.checked=flag;
      }
    }
  },
 
  handleSaveDistrict(){
    saveDistrict({'cityDistrictIdList':this.cityDistrictIdList}).then((res)=>{
       wx.redirectTo({
          url: '/pages/before/qs/main'
          })
    });
  },
  handleSaveArea(){
    saveArea({'cityAreaIdList':this.cityAreaIdList}).then((res)=>{
       wx.redirectTo({
          url: '/pages/before/qs/main'
          })
    });
  },


},
    
 onUnload(){
  this.step1=true;
  this.step2=false;
  this.step3=false;
  this.districtList=[];
  this.areaList=[];
 },
 onShow(){
  this.goStep1();
    
  },



}


</script>

<style scoped>

</style>