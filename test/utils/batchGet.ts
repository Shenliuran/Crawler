import {ExcelAnalyze} from "../../src/models/excelAnalyze";
import {AddBody, AddRequest, Header, YaoHealthProductInfo} from "../../src/models/jsonAnalyze";
import Crawler from "../../src/models/crawler";
import {addProductTemplate_jiangsu} from "../../template/JiangSu";
import * as path from "path";
import {packaging} from "../../src/utils/packaging";
import * as fs from "fs";

/**
 * 打包生成一个添加商品请求
 * @param xlsItem 一条excel商品记录
 * @param header 添加商品请求的header
 * @param getRequestUrl 扒取的目标网站
 * @param categories 类型
 * @param regex 正则匹配表达式
 */
async function assembleOne(xlsItem: ExcelAnalyze.XLSItem, header: Header, getRequestUrl, categories: ExcelAnalyze.Categories, regex: RegExp) {
    console.log("fetchOne(...params)：正在扒取商品ID为：" + xlsItem.getProductId + " 的商品...")
    let crawler = new Crawler()
    crawler.setProductId = xlsItem.getProductId
    crawler.setRouter = getRequestUrl
    await crawler.crawling(xlsItem.getProductId, "json")
    let addBody: AddBody = JSON.parse(JSON.stringify(addProductTemplate_jiangsu))
    let productInfo: YaoHealthProductInfo
    productInfo = crawler.crawledResult
    packaging(crawler, addBody, productInfo, xlsItem, categories, regex)
    addBody.productImages.shift()
    addBody.productDescImages.shift()
    let rawRequest: AddRequest = {header: header, body: addBody}
    let filePath2 = path.resolve(__dirname, "..\\..\\out\\" + crawler.getProductId + "-headers.json")
    let request = JSON.stringify(rawRequest)
    fs.writeFileSync(filePath2, request)
    console.log("当前商品扒去成功!\n")
}

export async function batchGet(xlsData: ExcelAnalyze.XLSData, header: Header, getRequestUrl, categories: ExcelAnalyze.Categories, regex: RegExp) {
    console.log("batchGet(...params)：开始扒取商品...")
    for (let xlsItem of xlsData) {
        await assembleOne(xlsItem, header, getRequestUrl, categories, regex)
    }
    console.log("所有商品扒取完成！")
}