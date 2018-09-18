var crypto = require('crypto');
function oneZeroPadding(data)
{
	var buf=Buffer.from(data, 'ascii');
	var iFinalLen= parseInt((buf.length/16+1))*16;
	var iPadLen=(buf.length%16==0)?0:(iFinalLen-buf.length);
	var dss=[];
	//console.log(" "+iFinalLen+" "+iPadLen +" "+buf.length/16+1)
	if(iPadLen!=0)
	{
		var dstText=new Buffer(iFinalLen); 
		for(var i=0;i<buf.length;i++)
		{
			dstText[i]=buf[i];
			dss.push(buf[i]);
			
		}
		dstText[buf.length]=0x80;
		for(var k=buf.length+1;k<iFinalLen;k++)
		{
			dstText[k]=0x00;
		}
		return dstText;
	}else{
		return buf;
	}	
}

export function encryption(data, key) {
	key = key.toString()
	let _key=''
	const NUM='0000000000000000'
	if(key.length>16){
			 _key = key.substr(0,16)
	}
	else if(key.length<16){
		_key =(key+ NUM).substr(0,16)
	}else if(key.length===16){
		_key = key
	}
	return _key

  //   var iv = new Buffer(0);
  //   var clearEncoding = 'utf8';
  //   var cipherEncoding = 'hex';
  //   var cipherChunks = [];
	// var by=oneZeroPadding(data);
	// var buf=Buffer(oneZeroPadding(data));
	// var buffer=Buffer.from(data, 'ascii');
  //   var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
  //   cipher.setAutoPadding(false);
  //   cipherChunks.push(cipher.update(buf, clearEncoding, cipherEncoding));
  //   cipherChunks.push(cipher.final(cipherEncoding));
  //   return cipherChunks.join('');
}

// module.exports = encryption
// console.log(encryption("andLive_visitorl","0000000000000000").toUpperCase());

