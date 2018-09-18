var crypto = require('crypto');
var request = require('request');

class keng {
  constructor(pop) {
    //用户信息
    this.userInfo = {
      loginName: "hello",
      pwd: "world",
      loginDomain: ""
    }
    //前端
    this.AuthInfo = {
      nonce: "",
      statusCode: 0
    };

    this.userName = "anonymous";
    this.pwd = "andLive_visitorl";
    this.url = "api/app/getActivityPlayUrl";
    this.activityId="cdbi18kwwpbwj3skauxs7i71bwl2653h";
    this.CONNTION_EXCEPTION = "1006";

  // /** HTTP请L求消息头 HOST_KEY */
  this.REQUEST_HEADER_HOST_KEY = "Host";

  // /** HTTP请求消息头 USER_AGENT_KEY */
  this.REQUEST_HEADER_USER_AGENT_KEY = "User-Agent";

  // /** HTTP请求消息头 DATE_KEY */
  this.REQUEST_HEADER_DATE_KEY = "Date";

  // /** HTTP请求消息头 CONNECTION_KEY */
  this.REQUEST_HEADER_CONNECTION_KEY = "Connection";

  // /** HTTP请求消息头 CONTENT_TYPE_KEY */
  this.REQUEST_HEADER_CONTENT_TYPE_KEY = "Content-Type";

  // /** HTTP请求消息头 AUTHORIZATION_KEY */
  this.REQUEST_HEADER_AUTHORIZATION_KEY = "Authorization";

  // /** 到WSU鉴权时默认的nonce值 */
  this.DEFAULT_NONCE = "4a568c428a037e2f849526a7dc65ef25";

  // /** Digest认证的指定客户端对该消息应用的保护等级 */
  this.AUTHORIZATION_QOP_VALUE = "auth";

  // /**
  //  * NC计数参数 到WSU鉴权时默认的nc值 M xsd:string
  //  * 客户端请求的十六进制计数，以00000001开始，每次请求加1，目的是防止重放攻击。*
  //  */
  // /** 客户端nonce值 到WSU鉴权时默认的cnonce值 客户端用来鉴定服务器的摘要质询参数，本版本暂不实现客户端对服务器的认证* */
  this.DEFAULT_NC = "00000001";
  this.DEFAULT_CNONCE = "00000001";

  // /** 到WSU鉴权时默认的opaque值: 会话标识 由服务器指定，客户端须在请求二中返回该数据。采用十六进制数据 */
  this.DEFAULT_OPAQUE = "5ccc069c403ebaf9f0171e9517f40e41";

  // /** HTTP请求消息头 平台响应为401时的AUTHORIZATION_KEY */
  this.REQUEST_HEADER_AUTHORIZATION_KEY_RESP_401 = "WWW-Authenticate";

  };


  //main入口
  sendMsgToBpc(userName, passWord, wsuURL, activityId, sendMsgStr, callback) {

    let thz=this
    let code = 100;

    this.userInfo.loginName = userName;
    this.userInfo.pwd = this.encryption(passWord, "000000000000").toUpperCase();

    console.log("sendMsgToBpc:: " + sendMsgStr + "\n");
    this.sendMsgToServer(sendMsgStr, this.userInfo, wsuURL, function (code) {
      if (200 == code) {
        var resultXml;
        if (200 == thz.AuthInfo.statusCode) {
          resultXml = thz.AuthInfo.nonce;
          callback(null, null, resultXml);
        } else if (401 == thz.AuthInfo.statusCode) {
          thz.sendBusnMsgToBpc(sendMsgStr, thz.userInfo, thz.AuthInfo.nonce, wsuURL, function (error, response, boby) {
            callback(error, response, boby);
          });
        } else {
          resultXml = CONNTION_EXCEPTION;
          callback(null, null, resultXml);
        }
      }

    });
  };
  //发送请求
  sendMsgToServer( sendMsgXml, authUserInfo, wsuURL, mycallback ) {
    var nonce=this.DEFAULT_NONCE;
    var body=sendMsgXml;
    // console.log('jin1',body)
      this.PostMethod(1,body, authUserInfo,nonce, wsuURL,function(code){
      if(code=="success")
      {
        mycallback(200);
      }else{
        mycallback(403);
      }
    });
  };
  //鉴权
  sendBusnMsgToBpc( sendMsgXml,  authUserInfo, nonce, wsuUrls,callback ) {
    var body=sendMsgXml;
	  this.PostMethod(2,body, authUserInfo,nonce, wsuUrls,function(error,response,boby){
        callback(error,response,boby);
    });	
  };

  //进行0 填充
  oneZeroPadding(data) {
    
    let buf = Buffer.from(data, 'ascii');
    let iFinalLen = parseInt((buf.length / 16 + 1)) * 16;
    let iPadLen = (buf.length % 16 == 0) ? 0 : (iFinalLen - buf.length);
    let dss = [];
    if (iPadLen != 0) {
      let dstText = new Buffer(iFinalLen);
      for (let i = 0; i < buf.length; i++) {
        dstText[i] = buf[i];
        dss.push(buf[i]);

      }
      dstText[buf.length] = 0x80;
      for (let k = buf.length + 1; k < iFinalLen; k++) {
        dstText[k] = 0x00;
      }
      return dstText;
    } else {
      return buf;
    }
  };
  //矫正Key
  getkey(key) {
    let tempkey;
    if (key.length >= 16) {
      tempkey = key.substr(0, 16);
    } else {

      tempkey = key;
      for (var i = 0; i < 16 - key.length; i++)
        tempkey += '0';
    }
    return tempkey

  };

  //AES 加密
  encryption(data, key) {
    let skey = this.getkey(key);
    let iv = new Buffer(0);
    let clearEncoding = 'utf8';
    let cipherEncoding = 'hex';
    let cipherChunks = [];
    let by = this.oneZeroPadding(data);
    let buf = Buffer(this.oneZeroPadding(data));
    let buffer = Buffer.from(data, 'ascii');
    let cipher = crypto.createCipheriv('aes-128-ecb', skey, iv);

    cipher.setAutoPadding(false);
    cipherChunks.push(cipher.update(buf, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
  }

  //post请求
  PostMethod(type, bodystr, authUserInfo, nonce, wsuUrls, callback) {
    let thz = this
    let wsuUrl = wsuUrls;
    let username = authUserInfo.loginName;
    let realm = "";
    let passWord = "";
    if ("anonymous" == username) {
      passWord = "andLive_visitor";
    } else {
      passWord = authUserInfo.pwd;
    }

    let  strObj = `${nonce}${username}${passWord}POST${wsuUrls}`
    var md5 = crypto.createHash("md5");
    md5.update(strObj);
    let md5String = md5.digest('hex');

    let authorization = `Digest username=${username},realm=${realm},nonce=${nonce},uri=${wsuUrl},response=${md5String},cnonce=${this.DEFAULT_CNONCE},opaque=${this.DEFAULT_OPAQUE},qop=${this.AUTHORIZATION_QOP_VALUE},nc=${this.DEFAULT_NC}`

    // HTTP请求消息头 UTHORIZATIO_VALUE
    let requestHeaderAuthorizationValue = authorization;
    let requestHeaderHostValue = wsuUrl.split("/")[2];
    let requestHeaderUserAgentValue = "Huawei SGW/V100R002C20";
    let requestHeaderDateValue = new Date().toGMTString();
    let requestHeaderConnectionValue = "close";
    let requestHeaderContentTypeValue = "application/json;charset=utf-8";
    request({
      url: wsuUrl,
      method: "POST",
      headers: {
        "Host": requestHeaderHostValue,
        "User-Agent": requestHeaderUserAgentValue,
        "Date": requestHeaderDateValue,
        "Connection": requestHeaderConnectionValue,
        "Content-Type": requestHeaderContentTypeValue,
        "Authorization": requestHeaderAuthorizationValue
      },
      body: bodystr
    }, function (error, response, body) {
      if (!error) {
        thz.AuthInfo.statusCode = response.statusCode;
        if (type == 1) {

          if (401 == response.statusCode) {
            // 获得响应消息中的WWW-Authenticate消息头

            var authenticate = "" + response.headers['www-authenticate'];
            var reg = /[,=]/;
            var res = authenticate.split(reg);
            var index = -1;
            var nonce = ""
            for (var i = 0; i < res.length; i++) {
              if (res[i].toString() == "nonce") {
                nonce = res[i + 1];
                break;
              }
            }
            
            thz.AuthInfo.nonce = nonce;
          }
          if (200 == response.statusCode) {
            var resultXml = body;
            this.AuthInfo.nonce = resultXml;
          }
          callback("success");
        }

        if (type == 2) {
          callback(error, response, body);
        }
      }

    });
  }

}



module.exports = keng
