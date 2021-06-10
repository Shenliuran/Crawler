import {Header} from "../modules/Impl/requestPayloadImpl";
import {testHeader, testHeaders, testPostUrl} from "../request/testRequest";


//爬取目标请求接口
export const getUrl = "https://wap.pharmakeyring.com/wsc/goods/findGoodsInfoBasic.json"
//插入网站对象请求接口
export const postUrl = testPostUrl
//RequestPayloadHeader
export const header: Header = testHeader
//数据报请求头
export const headers = testHeaders
//爬取请求延迟
export const getRequestSleep = 3000
//发送请求延迟
export const postRequestSleep = 3000
