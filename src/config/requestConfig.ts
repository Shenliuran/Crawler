import {Header} from "../models/jsonAnalyze";

const testPostUrl = "https://110.api.jxjsyyjt.com/merchant/changeProduct"
const testHeaders = {
    'Host': '110.api.jxjsyyjt.com',
    'Connection': 'keep-alive',
    'Content-Length': '1263',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'http://110.wnspc.jxjsyyjt.com',
    'Referer': 'http://110.wnspc.jxjsyyjt.com/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
}
const testHeader: Header = {
    requestId: "Pg1q12M5Csf1Z7J7vbTbVn8spmdLEvNE",
    timeStamp: "20210509104946",
    applicationId: "b2b2c-merchant",
    ip: "127.0.0.1",
    tokenId: "DbERq0WAi6s18s4u5SuZ8L38Shcx1kzc",
}
const formalHeader: Header = {
    requestId: "Pg1q12M5Csf1Z7J7vbTbVn8spmdLEvNE",
    timeStamp: "20210509104946",
    applicationId: "b2b2c-merchant",
    ip: "127.0.0.1",
    tokenId: "H6J81dPFZ6M7txdWvz3KcqeJNyYH8wUG",
}
const formalHeaders = {
    'Host': 'wns.api.jxjsyyjt.com',
    'Connection': 'keep-alive',
    'Content-Length': '1263',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'http://wns.pc.jxjsyyjt.com',
    'Referer': 'http://wns.pc.jxjsyyjt.com/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
}

export const getUrl = "https://wap.pharmakeyring.com/wsc/goods/findGoodsInfoBasic.json"
export const postUrl = testPostUrl
export const header: Header = testHeader
export const headers = testHeaders
export const getRequestSleep = 5000
export const postRequestSleep = 5000
