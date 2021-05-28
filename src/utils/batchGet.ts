import {Categories, Tuple, Excel} from "../modules/excelAnalyze";
import {AddBody, AddRequest, Header, YaoHealthProductInfo} from "../modules/Impl/requestPayloadImpl";
import Crawler from "../modules/crawler";
import {addProductTemplate_jiangsu} from "../../template/JiangSu";
import * as path from "path"
import {packing} from "./packing";
import * as fs from "fs"
import {sleep} from "../components/axios";
import {getRequestSleep} from "../config/requestConfig";

/**
 * 打包生成一个添加商品请求
 * @param excelIndexName
 * @param xlsItem 一条excel商品记录
 * @param header 添加商品请求的header
 * @param getRequestUrl 扒取的目标网站
 * @param categories 类型
 * @param regex 正则匹配表达式
 * @param addBody
 */
async function assembleOne(excelIndexName: string, xlsItem: Tuple, header: Header, getRequestUrl, categories: Categories, regex: RegExp, addBody: AddBody) {
    console.log("fetchOne(...params)：正在扒取商品ID为：" + xlsItem[excelIndexName] + " 的商品...")
    let crawler = new Crawler()
    crawler.params = {productId: xlsItem[excelIndexName]}
    crawler.router = getRequestUrl
    crawler.crawlingKey = excelIndexName
    await crawler.crawling()
    await sleep(getRequestSleep)
    let productInfo: YaoHealthProductInfo = crawler.crawledResult.data.data.goodsInfos
    packing(crawler, addBody, productInfo, xlsItem, categories, regex)
    addBody.productImages.shift()
    addBody.productDescImages.shift()
    let rawRequest: AddRequest = {header: header, body: addBody}
    let filePath2 = path.resolve(__dirname, "..\\..\\out\\" + crawler.params["productId"] + "-headers.json")
    let request = JSON.stringify(rawRequest)
    fs.writeFileSync(filePath2, request)
    console.log("当前商品扒取成功!\n")
}

/**
 * 批量爬取并批量大打包
 * @param xlsData excel数据
 * @param header 添加商品请求的header
 * @param getRequestUrl 扒取的目标网站
 * @param categories 类型
 * @param regex 正则匹配表达式
 * @param template 请求模板
 */
export async function batchGet(xlsData: Excel, header: Header, getRequestUrl, categories: Categories, regex: RegExp, template: AddBody) {
    console.log("*********************************************************")
    console.log("batchGet(...params)：开始扒取商品...\n")
    let values = Array.from(xlsData.tuples.values())
    for (let value of values) {
       await assembleOne(xlsData.excelIndexName, value, header, getRequestUrl, categories, regex, template)
    }
    console.log("所有商品扒取完成！\n")
    console.log("*********************************************************")
}