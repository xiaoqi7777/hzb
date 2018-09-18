// import keng from './config';
var keng = require('./config');

let a = new keng()




let userName = "anonymous";
let pwd = "andLive_visitorl";
let url = "http://access.hezhibo.com:8008/bpc/api/app/getActivityPlayUrl";
let activityId="cdbi18kwwpbwj3skauxs7i71bwl2653h";

 var sendMsgStr="{\"MsgBody\": {\"activityId\":"+"\""+activityId+"\""+",\"cuType\": \"WEB\",\"cuVersion\": \"1.0.1\",\"cuVersionDesc\": \"V1.0\",\"loginName\": "+"\""+userName+"\""+",\"systemVersion\": \"string\",\"urlType\": \"0\",\"userLan\": \"zh\"},\"MsgHead\": {\"direction\": \"request\",\"msgType\": \"string\",\"version\": \"1.0\"}}";
 a.sendMsgToBpc(userName,pwd,url,activityId,sendMsgStr,function(error,response,boby){
	console.log("getMsgToBpc::"+boby+" \n");
	
});


var sendMsgStr="{\"MsgBody\": {\"userId\":"+"\""+activityId+"\""+",\"cuType\": \"WEB\",\"cuVersion\": \"1.0.1\",\"cuVersionDesc\": \"V1.0\",\"loginName\": "+"\""+userName+"\""+",\"systemVersion\": \"string\",\"urlType\": \"0\",\"userLan\": \"zh\"},\"MsgHead\": {\"direction\": \"request\",\"msgType\": \"string\",\"version\": \"1.0\"}}";
	let getpalist= "http://access.hezhibo.com:8008/bpc/api/app/getPraiseList";
   a.sendMsgToBpc(userName,pwd,getpalist,activityId,sendMsgStr,function(error,response,boby){
	console.log("getpalist--->"+boby.MsgBody);
});