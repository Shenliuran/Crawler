import xlsx from "node-xlsx";
import {logsys} from "../components/log4js";

interface Tuple {
    [attribute: string]: any
}

/**
 * 对应excel中的所用信息
 */
export class Excel  {
    private readonly _titles: Map<string, number> //excel标题栏
    private readonly _tuples: Map<number, Tuple> //excel数据
    private readonly _total: number //excel数据总数
    private readonly _excelIndexName: string //excel索引名称（唯一主键）
    private readonly _excelIndexTable: Map<any, number>

    public get total(): number { return this._total }
    public get titles(): Map<string, number> { return this._titles }

    /**
     * 创建excel与XLSData对象的映射关系，将excel数据存储在XLSData对象中
     * @param excelTable excel表单数据
     * @param excelIndexName
     * @constructor
     */
    constructor(excelTable: Array<Array<any>>, excelIndexName?: any) {
        this._excelIndexName = excelIndexName
        this._excelIndexTable = new Map<any, number>()
        this._titles = new Map<string, number>()
        this._tuples = new Map<number, Tuple>()
        this._total = excelTable.length - 1
        for (let i = 0; i < excelTable[0].length; i++) {
            this._titles.set(excelTable[0][i], i)
        }
        if (this._excelIndexName !== undefined) {
            if (this._titles.has(this._excelIndexName)) {
                for (let i = 1; i < excelTable.length; i++) {
                    let item: Tuple = {}
                    this._titles.forEach((value, key) => {
                        item[key] = excelTable[i][value]
                        if (key === this._excelIndexName)
                            this._excelIndexTable.set(excelTable[i][value], i)
                    })
                    this._tuples.set(i - 1, item)
                }
            } else {
                logsys.getLogger("error").error("所设定查询索引：" + this._excelIndexName + " 不为Excel的列属性成员")
            }
        }
    }

    /**
     * excel中的所有数据（不包括标题栏）
     * @return excel中的所有数据
     */
    public get tuples(): Map<number, Tuple> { return this._tuples }

    /**
     * @return excel索引列表
     */
    public get excelIndexTable(): Map<any, number> { return this._excelIndexTable }

}

/**
 * 将商品名称与商品编码形成映射
 * key: productCateName 商品类型路径
 *  如：/grandpa/father/son
 * value: productCode 商品编码
 */
export type Categories = Map<string, string>


/**
 * 将商品编码与商品类型路径进行映射
 * @param excelData excel数据
 * @return 商品类型路径与商品编码的映射关系
 */
export function mappingCate(excelData: Array<Array<any>>): Categories {
    let categories = new Map<string, string>()
    for (let i = 1; i < excelData.length; i++) {
        categories.set(excelData[i][2], excelData[i][0])
    }
    return categories
}

/**
 * 读取excel数据，并作简单处理
 * @param path excel文件路径
 * @param excelIndexName excel表格唯一主键
 */
export function readExcelData(path: string, excelIndexName?: any):  Excel {
    const sheets1 = xlsx.parse(path)
    const excelData = sheets1[0].data
    const excelFiltered1 = excelData.filter(excelItem => {
        return excelItem[1] !== undefined
    })
    return new Excel(excelFiltered1, excelIndexName)
}

/**
 * 读取excel中的类型
 * @param path
 */
export function readExcelCategories(path: string): Categories {
    const sheets2 = xlsx.parse(path)
    const excelFiltered2 = sheets2[0].data
    return mappingCate(excelFiltered2)
}


/**
 * 单元测试
 */
// const excel = readExcelData("./resource/test.xlsx", "goodsId")
// console.log(excel.excelIndexTable)

// for (let i = 1; i <= excel.total; i++) {
//     console.log(excel.tuples.get(i))
// }
