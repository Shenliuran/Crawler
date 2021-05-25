import {Categories, XLSData, XLSItem} from "../models/excelAnalyze";
import {AddBody, AddRequest, Header, YaoHealthProductInfo} from "../models/jsonAnalyze";
import Crawler from "../models/crawler";
import {addProductTemplate_jiangsu} from "../../template/JiangSu";
import * as path from "path"
import {packaging} from "./packaging";
import * as fs from "fs"
import {sleep} from "../components/axios";
import {getRequestSleep} from "../config/requestConfig";

/**
 * 打包生成一个添加商品请求
 * @param xlsItem 一条excel商品记录
 * @param header 添加商品请求的header
 * @param getRequestUrl 扒取的目标网站
 * @param categories 类型
 * @param regex 正则匹配表达式
 * @param template 请求模板
 */
async function assembleOne(xlsItem: XLSItem, header: Header, getRequestUrl, categories: Categories, regex: RegExp, template: AddBody) {
    console.log("fetchOne(...params)：正在扒取商品ID为：" + xlsItem.getProductId + " 的商品...")
    let crawler = new Crawler()
    crawler.setProductId = xlsItem.getProductId
    crawler.setRouter = getRequestUrl
    await crawler.crawling(xlsItem.getProductId, "json")
    await sleep(getRequestSleep)
    let addBody: AddBody = JSON.parse(JSON.stringify(template))
    let productInfo: YaoHealthProductInfo
    productInfo = crawler.crawledResult
    packaging(crawler, addBody, productInfo, xlsItem, categories, regex)
    addBody.productImages.shift()
    addBody.productDescImages.shift()
    let rawRequest: AddRequest = {header: header, body: addBody}
    let filePath2 = path.resolve(__dirname, "..\\..\\out\\" + crawler.getProductId + "-headers.json")
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
export async function batchGet(xlsData: XLSData, header: Header, getRequestUrl, categories: Categories, regex: RegExp, template: AddBody) {
    console.log("*********************************************************")
    console.log("batchGet(...params)：开始扒取商品...\n")
    for (let xlsItem of xlsData) {
        await assembleOne(xlsItem, header, getRequestUrl, categories, regex, template)
    }
    console.log("所有商品扒取完成！\n")
    console.log("*********************************************************")
}