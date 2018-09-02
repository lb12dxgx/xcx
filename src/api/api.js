import qs from 'qs';

var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly

 

//let base = ip;
//let base = 'http://'+ip+'/api/';
let base = 'http://127.0.0.1:80';
export const isExitByTelphone = params => {return fly.post(`${base}/xcx/isExitByTelphone.xcx`,qs.stringify(params)).then(res => res.data);}; 
export const getSmsCode = params => { return fly.post(`${base}/xcx/getSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const validateSmsCode = params => { return fly.post(`${base}/xcx/validateSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getOpenId = params => { return fly.post(`${base}/xcx/getOpenId.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const regUser = params => { return fly.post(`${base}/xcx/regUser.xcx`,qs.stringify(params)).then(res => res.data); }; 


export const savePersonDesc = params => { return fly.post(`${base}/xcx/savePersonDesc.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const isExitByUserCode = params => { return fly.post(`${base}/xcx/isExitByUserCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getPersonByOpenid = params => { return fly.post(`${base}/xcx/getPersonByOpenid.xcx`,qs.stringify(params)).then(res => res.data); }; 


