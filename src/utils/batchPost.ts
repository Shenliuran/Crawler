import {AddRequest} from "../models/jsonAnalyze";
import {logsys} from "../components/log4js";
import {Excel} from "../models/excelAnalyze";
import * as path from "path";
import {https, sleep} from "../components/axios";
import {postRequestSleep} from "../config/requestConfig";

/**
 * 添加商品的axios请求处理
 * @param headers 浏览器请求发送模拟
 * @param request 请求体
 * @param postUrl 请求接口
 */
async function add(headers: {}, request: AddRequest, postUrl: string) {
    let record = "商品：[名称：" + request.body.productName + ", 商品编码：" + request.body.productCode + " ]"
    console.log("add(...params)：" + record + " 发起请求...")
    let data = JSON.stringify(request)
    https({
        method: "post",
        url: postUrl,
        headers: headers,
        data: data
    }).then(response => {
        if (response.status == 201) {
            logsys.getLogger("trace").trace(record +  " 插入成功!")
        } else {
            if (response.status == 200) {
                logsys.getLogger("trace").trace(record + " 请求不符合接口要求! 请求状态码：" + response.status)
            } else if (response.status == 502 || response.status == 503) {
                logsys.getLogger("trace").trace(record + " 请求被封锁! 请求状态码：" + response.status)
            } else {
                logsys.getLogger("trace").trace(record + " 请求失败! 请求状态码：" + response.status)
            }
            logsys.getLogger("record").trace(record)
        }
        console.log("请求结束。")
    }).catch(err => {
        logsys.getLogger("error").error(err + " 请求异常!")
        console.log("请求结束。")
    })
}

/**
 * 批量post请求
 * @param xlsDate excel表格数据
 * @param headers 浏览器请求发送模拟
 * @param postUrl 请求接口
 */
export async function batchPost(xlsDate: Excel, headers: {}, postUrl: string) {
    console.log("*********************************************************")
    console.log("batchPost(...params)：开始批量发送post请求...\n")
    logsys.getLogger("record").trace("开始记录未插入成功的商品...")
    // @ts-ignore
    for (let xlsItem of xlsDate.tuples.values()) {
        let headersPath = path.resolve(__dirname, "../../out/" + xlsItem["productId"] + "-headers.json")
        let request = require(headersPath)
        await add(headers, request, postUrl)
        await sleep(postRequestSleep)
    }
    logsys.getLogger("record").trace("记录完成。")
    console.log("批量商品post请求结束。")
    console.log("*********************************************************")
}