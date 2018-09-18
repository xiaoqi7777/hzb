import axios from 'axios';
import { encryption } from "../util/encryption";


let axio = axios.create({
  baseURL: ''
})

// Digest username=anonymous,realm=,nonce=48g77beykvkho8w6bzanzxlu4rbm80nysc,uri=http://access.hezhibo.com:8008/bpc/api/app/getActivityPlayUrl,response=fcabfa9b9b0d1c0f39ff8552cd7cb46f,cnonce=00000001,opaque=5ccc069c403ebaf9f0171e9517f40e41,qop=auth,nc=00000001

 axio.interceptors.request.use(function (config) {
    // config.headers['Content-Type'] ="Digest  username=anonymous,realm=,nonce=48g77beykvkho8w6bzanzxlu4rbm80nysc,uri=http://access.hezhibo.com:8008/bpc/api/app/getActivityPlayUrl,response=fcabfa9b9b0d1c0f39ff8552cd7cb46f,cnonce=00000001,opaque=5ccc069c403ebaf9f0171e9517f40e41,qop=auth,nc=00000001"
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=123';
    // config.headers.authorization = "Digest  username=anonymous,realm=,nonce=48g77beykvkho8w6bzanzxlu4rbm80nysc,uri=http://access.hezhibo.com:8008/bpc/api/app/getActivityPlayUrl,response=fcabfa9b9b0d1c0f39ff8552cd7cb46f,cnonce=00000001,opaque=5ccc069c403ebaf9f0171e9517f40e41,qop=auth,nc=00000001"

    console.log(config)
    return config
  }, function (err) {
    return Promise.reject(err)
  })

export function http(){
  return axio
} 

