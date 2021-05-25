import xlsx from "node-xlsx";
import {transFromExcelTOXLSData} from "../config/excelConfig";

/**
 * 对应excel中的每一行信息
 */
export class XLSItem {
    private readonly productCode: string //商品编号
    private readonly productId: string //商品ID
    private productName: string //商品名称
    private readonly productCateName: string //类目名称
    private productCostPrice?: number //商品成本价格
    private readonly productRetailPrice?: number //商品销售价格

    public get getProductCode(): string {
        return this.productCode
    }

    public get getProductId(): string {
        return this.productId
    }

    public get getProductName(): string {
        return this.productName
    }

    public get getProductCateName(): string {
        return this.productCateName
    }

    public get getProductCostPrice(): number {
        return this.productCostPrice
    }

    public get getProductRetailPrice(): number {
        return this.productRetailPrice
    }

    public set setProductName(productName: string) {
        this.productName = productName
    }

    public set setProductCostPrice(productCostPrice: number) {
        this.productCostPrice = productCostPrice
    }

    /**
     * 第一列：商品编码（productCode或者productSn)
     * 第二列：商品ID（productID）
     * 第三列：商品名称（productName）
     * 第四列：商品类型名或商品类型路径名（productCateName）
     * 第五列：商品销售价格（productRetailPrice）
     * 第六列：商品成本价格（productCostPrice）可选项；没有时，这一列需要空出
     * @param excelFromItem
     * @constructor
     */
    public constructor(excelFromItem: Array<any>) {
        this.productCode = excelFromItem[transFromExcelTOXLSData.productCodeIndex]
        this.productId = excelFromItem[transFromExcelTOXLSData.productIdIndex]
        this.productName = excelFromItem[transFromExcelTOXLSData.productNameIndex]
        this.productCateName = excelFromItem[transFromExcelTOXLSData.productCateNameIndex]
        this.productRetailPrice = excelFromItem[transFromExcelTOXLSData.productRetailPriceIndex]
        // this.productCostPrice = excelFromItem[5]
    }
}

/**
 * 对应excel中的所用信息
 */
export class XLSData extends Array<XLSItem> {

    /**
     * 创建excel与XLSData对象的映射关系，将excel数据存储在XLSData对象中
     * @param? excel excel表单数据
     * @constructor
     */
    public constructor(excelTable?: Array<Array<any>>) {
        super()
        for (let i = 1; i < excelTable.length; i++) {
            this.push(new XLSItem(excelTable[i]))
        }
    }

    /**
     * excel数据去重
     * @param condition 条件数组
     */
    private unique(condition: Array<string>): XLSData {
        return null
    }

    /**
     * 处理商品中，商品类型没有匹配上的商品
     * @param condition 条件数组
     * @param field 当条件被激活时，触犯条件的商品名称被替换为filed
     */
    public dataClean(condition: () => Array<string>, field: string): void {
        let cateNameList: Array<string> = condition()
        this.forEach(xlsItem => {
            if (!cateNameList.includes(xlsItem.getProductCateName)) {
                xlsItem.setProductName = field
            }
        })
    }

    /**
     * 找到商品ID项目的商品
     * @return 商品ID数组
     */
    public get repeatedItems(): Array<string> {
        let record = new Array<string>()
        let repeatId = 0
        for (let i = 1; i < this.length - 1; i++) {
            if (this[i].getProductId !== this[i - 1].getProductId && this[i].getProductId === this[i + 1].getProductId) {
                record.push(this[i].getProductName)
            }
        }
        return record
    }
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
 * @param path
 */
export function readExcelData(path: string): XLSData {
    const sheets1 = xlsx.parse(path)
    const excelData = sheets1[0].data
    const excelFiltered1 = excelData.filter(excelItem => {
        return excelItem[1] !== undefined
    })
    return new XLSData(excelFiltered1)
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
