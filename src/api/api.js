import qs from 'qs';

var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly

 
  
//let base = ip;
//let base = 'http://'+ip+'/api/';
//let base = 'http://www.118-china.com/'
let base = 'https://xcx.118-china.com/'
//let base = 'http://127.0.0.1:80';
export const url=base;
export const isExitByTelphone = params => {return fly.post(`${base}/xcx/isExitByTelphone.xcx`,qs.stringify(params)).then(res => res.data);}; 
export const getSmsCode = params => { return fly.post(`${base}/xcx/getSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const validateSmsCode = params => { return fly.post(`${base}/xcx/validateSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getOpenId = params => { return fly.post(`${base}/xcx/getOpenId.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const regUser = params => { return fly.post(`${base}/xcx/regUser.xcx`,qs.stringify(params)).then(res => res.data); }; 


export const savePersonDesc = params => { return fly.post(`${base}/xcx/login/savePersonDesc.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const isExitByUserCode = params => { return fly.post(`${base}/xcx/login/isExitByUserCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getPersonByOpenid = params => { return fly.post(`${base}/xcx/login/getPersonByOpenid.xcx`,qs.stringify(params)).then(res => res.data); }; 

export const accidentinfoList = params => { return fly.post(`${base}/xcx/login/accidentinfo/list.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const addAccidentinfo = params => { return fly.post(`${base}/xcx/login/accidentinfo/add.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const saveAccidentinfo = params => { return fly.post(`${base}/xcx/login/accidentinfo/save.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getAccidentinfo = params => { return fly.post(`${base}/xcx/login/accidentinfo/get.xcx`,qs.stringify(params)).then(res => res.data); }; 

export const deleteFile = params => { return fly.post(`${base}/xcx/accidentinfo/deleteFile.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getFileList = params => { return fly.post(`${base}/xcx/accidentinfo/getFileList.xcx`,qs.stringify(params)).then(res => res.data); }; 


export const getAddressByMap = params => { return fly.post(`${base}/xcx/map/getAddress.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getCityByMap = params => { return fly.post(`${base}/xcx/map/getCity.xcx`,qs.stringify(params)).then(res => res.data); }; 

export const applaycityList = params => { return fly.post(`${base}/xcx/login/before/applaycity/list.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const saveApplaycity = params => { return fly.post(`${base}/xcx/login/before/applaycity/save.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const exitApplaycity = params => { return fly.post(`${base}/xcx/login/before/applaycity/exit.xcx`,qs.stringify(params)).then(res => res.data); };
export const getApplaycity = params => { return fly.post(`${base}/xcx/login/before/applaycity/get.xcx`,qs.stringify(params)).then(res => res.data); };


export const getAreaByOpenId = params => { return fly.post(`${base}/xcx/login/before/cityarea/getAreaByOpenId.xcx`,qs.stringify(params)).then(res => res.data); };
export const saveArea = params => { return fly.post(`${base}/xcx/login/before/cityarea/save.xcx`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); };
export const getDistrictByOpenId = params => { return fly.post(`${base}/xcx/login/before/citydistrict/getDistrictByOpenId.xcx`,qs.stringify(params)).then(res => res.data); };
export const saveDistrict = params => { return fly.post(`${base}/xcx/login/before/citydistrict/save.xcx`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); };



export const exitEnterprise = params => { return fly.post(`${base}/xcx/login/before/enterprise/exitByNameAndCity.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const enterpriseList = params => { return fly.post(`${base}/xcx/login/before/enterprise/list.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const saveEnterprise = params => { return fly.post(`${base}/xcx/login/before/enterprise/save.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const addPersonEnterprise = params => { return fly.post(`${base}/xcx/login/before/enterprise/addPerson.xcx`,qs.stringify(params)).then(res => res.data); }; 

export const applayprojectListByCityId = params => { return fly.post(`${base}/xcx/login/before/applayproject/listByCityId.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const applayprojectListByOpenId = params => { return fly.post(`${base}/xcx/login/before/applayproject/listByOpenId.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const applayprojectListFinshByOpenId = params => { return fly.post(`${base}/xcx/login/before/applayproject/listFinshByOpenId.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const saveApplayproject = params => { return fly.post(`${base}/xcx/login/before/applayproject/save.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getApplayproject = params => { return fly.post(`${base}/xcx/login/before/applayproject/get.xcx`,qs.stringify(params)).then(res => res.data); };
export const addApplayproject = params => { return fly.post(`${base}/xcx/login/before/applayproject/add.xcx`,qs.stringify(params)).then(res => res.data); };


export const saveProjectResult = params => { return fly.post(`${base}/xcx/login/before/result/save.xcx`,qs.stringify(params)).then(res => res.data); };
export const projectresultListByProject = params => { return fly.post(`${base}/xcx/login/before/result/listbyProject.xcx`,qs.stringify(params)).then(res => res.data); }; 



export const meetList = params => { return fly.post(`${base}/xcx/login/meet/list.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getMeet = params => { return fly.post(`${base}/xcx/login/meet/get.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const meetPlanList = params => { return fly.post(`${base}/xcx/login/meet/plan/list.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetPlan = params => { return fly.post(`${base}/xcx/login/meet/plan/get.xcx`,qs.stringify(params)).then(res => res.data); }; 

export const giftList = params => { return fly.post(`${base}/xcx/login/mail/giftList.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getGift = params => { return fly.post(`${base}/xcx/login/mail/getGift.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const exchangeGift = params => { return fly.post(`${base}/xcx/login/mail/exchangeGift.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const exchangeList = params => { return fly.post(`${base}/xcx/login/mail/exchangeList.xcx`,qs.stringify(params)).then(res => res.data); }; 


export const myProblem = params => { return fly.post(`${base}/xcx/login/sns/myProblem.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const addProblem = params => { return fly.post(`${base}/xcx/login/sns/addProblem.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const saveProblem = params => { return fly.post(`${base}/xcx/login/sns/saveProblem.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getProblem = params => { return fly.post(`${base}/xcx/login/sns/getProblem.xcx`,qs.stringify(params)).then(res => res.data); }; 



export const wxPay = params => { return fly.post(`${base}/xcx/login/pay/wxPay.xcx`,qs.stringify(params)).then(res => res.data); }; 



fly.interceptors.request.use((request) => {
	request.headers.Authorization=wx.getStorageSync("openid");
	wx.showLoading({
      title: "加载中",
      mask: true,
    });
	return request;
})

fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response
  },
  (err) => {
    wx.hideLoading();
    if (err.status == 0) {
      return "网络连接异常"
    } else if (err.status == 1) {
      return "网络连接超时"
    } else if (err.status == 401) {
    	console.log(err.status);
        wx.showToast({
        title: '出现未知错误',
        icon: 'none',
        duration: 3000
      })

    	wx.clearStorageSync();
       wx.navigateTo({
    		url: '/pages/my/main'
 		 })
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    };
    // Do something with response error
  }
)
