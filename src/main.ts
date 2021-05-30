import {readExcelCategories, readExcelData} from "./modules/excelAnalyze";
import {categoryTablePath, dataTablePath} from "./config/excelConfig";
import {getUrl, header, headers, postUrl} from "./config/requestConfig";
import {imgRegex} from "./config/regexConfig";
import {batchGet} from "./utils/batchGet";
import {logsys} from "./components/log4js";
import {batchPost} from "./utils/batchPost";
import {addProductTemplate_test} from "../template/test";
import {addProductTemplate_jiangsu} from "../template/JiangSu";

/**
 * 读取excel数据
 */
const xlsData = readExcelData(dataTablePath, "productId")

/**
 * 读取categories信息
 */
const categories = readExcelCategories(categoryTablePath)

let condition = (): Array<string> => {
    let tmp = new Array<string>()
    //@ts-ignore
    for (let cateName of categories.keys()) {
        tmp.push(cateName)
    }
    return tmp
}

/**
 * 主函数
 */
function main() {
    logsys.getLogger("trace").trace("项目开始运行...")
    batchGet(xlsData, header, getUrl, categories, imgRegex, addProductTemplate_jiangsu).then(response => {
        batchPost(xlsData, headers, postUrl).then(response => {
            logsys.getLogger("trace").trace("项目终止运行!")
        }).catch(err => {
            logsys.getLogger("error").error(err + "\n 商品插入失败")
            process.exit(-1)
        })
    }).catch(err => {
        logsys.getLogger("error").error(err + "\n 扒取失败!")
        process.exit(-1)
    })
}

/**
 * 验证当前批请求是否正常运行
 */
function verify() {
    logsys.getLogger("debug").debug("项目开始运行...")
    batchGet(xlsData, header, getUrl, categories, imgRegex, addProductTemplate_test).then(response => {
        logsys.getLogger("debug").debug("项目终止运行!")
    }).catch(err => {
        logsys.getLogger("debug").debug(err + "\n 扒取失败!")
        process.exit(-1)
    })
}
verify()
//main()
