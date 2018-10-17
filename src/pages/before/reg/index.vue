<template>
  
  <div >
    <div class="step" v-if="step1">
        <div class="weui-cells__title">所在城市</div>
        <block v-if="city!=''">
        <div class="weui-cells ">
          <picker mode="selector"  :range="cityArray" @change="cityChange">
            <a  class="weui-cell weui-cell_access" >
              <div class="weui-cell__bd">
                <p>
                  {{city}}
                  <span v-if="exitCity">已开通</span>
                  <span v-if="!exitCity">未开通</span>
                </p> 
               
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </picker>
          </div>
         <input type="button" value="下一步" class="tj-btn" @click="toStep1()" v-if="exitCity">
         <input type="button" value="城市开通" class="tj-btn" @click="addCity()" v-if="!exitCity" >
       </block>
      
    </div>

    <div class="step1" v-if="step2">
        <div class="weui-cells__title">请选择身份</div>
        <div class="weui-cells ">
            <a v-for="(item, index) in items" class="weui-cell weui-cell_access" @click="toStep2(item.name)">
                <div class="weui-cell__bd">
                    <p>{{item.value}}</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
         </div>
        
    </div>

     <div class="step21" v-if="step31">
        <div class="weui-cells__title" style="height:55px">
        请选择权属单位
        <input type="button" value="新增" class="biaozhu-btn" @click="addQS()" style="width:30%"> 
        <!--   <input type="button"  class="zengjia-btn" @click="addQS()">  -->
        </div>

        <div class="weui-cells ">
           <a v-for="(item, index) in qsitems" class="weui-cell weui-cell_access" @click="toStepQs(item.enterpriseId)">
                <div class="weui-cell__bd">
                    <p>{{item.enterpriseName}}</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>

        </div>

         
    </div>

    <div class="step22" v-if="step32">
        <div class="weui-cells__title" style="height:55px">
          请所属建设单位
          <input type="button" value="新增" class="biaozhu-btn" @click="addJS()" style="width:30%"> 
        </div>
       
        <div class="weui-cells ">
             <a v-for="(item, index) in jsitems" class="weui-cell weui-cell_access" @click="toStepJs(item.enterpriseId)">
                <div class="weui-cell__bd">
                    <p>{{item.enterpriseName}}</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
           
        </div>
    </div>

  </div>
 

</template>

<script>
import {getCityByMap,exitApplaycity,getApplaycity,enterpriseList,addPersonEnterprise,applaycityList} from '../../../api/api';




export default {
  data () {
    return {
       items: [
        {name: '2', value: '权属单位',checked: 'true'},
        {name: '3', value: '建设单位',}
      ],
      qsitems: [],
      jsitems: [],
      cityArray:[],
      province:'',
      city:'',
      district:'',
      exitCity:true,
      applyCityId:'',
      step1:true,
      step2:false,
      step32:false,
      step31:false,
      addForm:{
        type:1,
        companyId:'',
      },
    }
     
  },


  methods: {
     
    toStep1(){
      this.step2=true;
      this.step1=false;
    },
    addCity(){
      var query="?cityName="+this.city+"&provinceName="+this.province;
       wx.navigateTo({
        url: '/pages/before/city/main'+query
     })
    },

    cityChange(e){
      this.city=this.cityArray[e.mp.detail.value];
    },


    toStep2(type){
      this.addForm.type=type;
      this.step2=false;
      this.step1=false;

      if(this.addForm.type==2){
        this.step31=true;
        enterpriseList({applyCityId:this.applyCityId,enterpriseType:2}).then((res)=>{
          this.qsitems=res.retData
        })
        
      }else{
         this.step32=true;
         enterpriseList({applyCityId:this.applyCityId,enterpriseType:3}).then((res)=>{
          this.jsitems=res.retData
        })
           
      }
    },

    addQS(){
      let query="?enterpriseType=2&applyCityId="+this.applyCityId
      wx.navigateTo({
        url: '/pages/before/enterprise/main'+query
     })
    },

    addJS(){
       let query="?enterpriseType=3&applyCityId="+this.applyCityId
      wx.navigateTo({
        url: '/pages/before/enterprise/main'+query
     })
    },

    toStepJs(enterpriseId){
      addPersonEnterprise({enterpriseId:enterpriseId}).then((res)=>{
       wx.setStorageSync("enterpriseType",this.addForm.type);
         wx.redirectTo({
          url: '/pages/before/js/main'
          })
      })
    },

    toStepQs(enterpriseId){
      addPersonEnterprise({enterpriseId:enterpriseId}).then((res)=>{
       wx.setStorageSync("enterpriseType",this.addForm.type);
          wx.redirectTo({
          url: '/pages/before/qs/main'
          })
      })
      
    },

    getLocationAddr(){

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
         
          var city=res.retData.city;
           var district=res.retData.district;

           exitApplaycity({cityName:city}).then((res)=>{
              _this.exitCity=res.retData;
              _this.city=city;
              _this.district=district;
              if(_this.exitCity){
                getApplaycity({cityName:city}).then((res)=>{
                   _this.applyCityId=res.retData.applyCityId;
                })
              }
           })
       });
          
        },
        fail(re){
          console.log(re);
        }
      });


    }
    
 },

	 onUnload(){
	 	this.step1=true;
	    this.step2=false;
	    this.step32=false;
	    this.step31=false;
      this.cityArray=[];
	},

  onLoad() {
      
      this.getLocationAddr();

      applaycityList().then((res)=>{
        var citylist=res.retData;
        for(var city of citylist){
          this.cityArray.push(city.cityName);
        }
      })
    

      let step=this.$root.$mp.query.step;

      if(step==31){
        this.step2=false;
        this.step1=false;
        this.step32=false;
        this.step31=true;

      } else if(step==32){
        this.step2=false;
        this.step1=false;
        this.step31=false;
        this.step32=true;
      }else{
        this.step1=true;
        this.step2=false;
        this.step31=false;
        this.step32=false;
      }
   
    
   }
}

</script>

<style scoped>
  .radioDiv{
    margin:10px 0px;

  }


</style>
