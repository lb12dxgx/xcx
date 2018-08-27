import qs from 'qs';

var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly



//let base = ip;
//let base = 'http://'+ip+'/api/';
let base = 'http://127.0.0.1:80';
export const isExitByTelphone = params => {return fly.post(`${base}/xcx/isExitByTelphone.xcx`,qs.stringify(params)).then(res => console.log(res) );}; 
export const getSmsCode = params => { return fly.post(`${base}/xcx/getSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const validateSmsCode = params => { return fly.post(`${base}/xcx/validateSmsCode.xcx`,qs.stringify(params)).then(res => res.data); }; 
export const getOpenId = params => { return fly.post(`${base}/xcx/getOpenId.xcx`,qs.stringify(params)).then(res => res.data); }; 