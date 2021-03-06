import {AddBody, regexSplit, YaoHealthProductInfo} from "../models/jsonAnalyze";
import {Categories, XLSItem} from "../models/excelAnalyze";
import Crawler from "../models/crawler";

/**
 * 将爬取的json内容与excel数据组装成添加商品的请求的body
 * @param crawler
 * @param target 添加请求的body
 * @param resFromWeb 爬取的json数据
 * @param resFromXLS excel数据
 * @param categories 商品类型与编码的映射关系
 * @param regex 图片url匹配的正则表达式
 */
export function packaging(crawler: Crawler,target: AddBody, resFromWeb: YaoHealthProductInfo, resFromXLS: XLSItem, categories: Categories, regex: RegExp) {
    let detailImages: string = crawler.crawledResult.description
    target.productName = resFromXLS.getProductName
    // target.unitPrice = resFromXLS.productRetailPrice
    target.unitPrice = resFromWeb.retailPrice
    target.productCostPrice = resFromWeb.retailPrice * 0.6
    target.unitPriceStandard = target.unitPrice

    target.productCateDTO.productCateUuid = resFromXLS.getProductCateName != '其他' ? categories.get(resFromXLS.getProductCateName) : 'ff80808178fc35f3017911db2ca50258'
    let mainImageUrl = resFromWeb.pageImgs[0].imgPath
    if (mainImageUrl.match(regex)) {
        mainImageUrl = mainImageUrl.replace('static.pharmakeyring.com', 'cdn2.jxjsyyjt.com')
    }
    target.productMainImage = {
        url: mainImageUrl,
        size: 37737,
        fileName: 'yjk1'
    }
    for (let i = 1; i < resFromWeb.pageImgs.length; i++) {
        let pageImgs = resFromWeb.pageImgs[i].imgPath
        if (pageImgs.match(regex)) {
            pageImgs = pageImgs.replace('static.pharmakeyring.com', 'cdn2.jxjsyyjt.com')
        }
        target.productImages.push({
            url: pageImgs,
            size: 37737,
            fileName: 'yjk2'
        })
    }

    target.productCommonName = target.productName
    target.productCode = resFromXLS.getProductCode

    regexSplit(regex, detailImages).forEach(imageUrl => {
        target.productDescImages.push({
            size: 37737,
            url: imageUrl,
            fileName: 'yjk3'
        })
    });
}