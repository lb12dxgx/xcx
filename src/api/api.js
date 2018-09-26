import qs from 'qs';

var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly

 

//let base = ip;
//let base = 'http://'+ip+'/api/';
//let base = 'http://www.118-china.com/'
let base = 'http://127.0.0.1:80';
export const url="http://127.0.0.1";
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


export const getAddressByMap = params => { return fly.post(`${base}/xcx/map/getAddress.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getCityByMap = params => { return fly.post(`${base}/xcx/map/getCity.xcx`,qs.stringify(params)).then(res => res.data); }; 





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
