/**
 * 添加商品的接口
 */
export interface AddBody {
    actionType: string
    merchantDTO: {
        merchantUuid: string
    }
    productName: string
    productNature: string
    memo: string
    productCode: string
    productBrief: string
    productType: string //商品类型
    skuEnabled: boolean
    totalUnit: number
    unitPrice: number //销售价
    unitPriceStandard: number //划线价 = 销售价格
    productCommonName: string
    productWeight: number
    hot: boolean
    new: string
    productCateDTO: {
        productCateUuid: string
    }
    attrList: []
    onSale: string
    deliveryExpressEnabled: boolean
    deliveryCityEnabled: boolean
    deliveryPickEnabled: boolean
    productFreightDTO: {
        productFreightUuid: string
    }
    productCostPrice: number //成本价
    productMainImage: {
        fileName: string
        size: number
        url: string
    }
    productImages: [
        {
            fileName: string
            size: number
            url: string
        }
    ]
    productDescImages: [
        {
            fileName: string
            size: number
            url: string
        }
    ]
}

/**
 * 请求Header
 */
export interface Header {
    requestId: string
    timeStamp: string
    applicationId: string
    ip: string
    tokenId: string
}

/**
 * 钥健康商品接口
 */
export interface YaoHealthProductInfo {
    activityPrice: number
    approvalNumber: string
    bigPic: string
    brandName: string
    category: string
    cityId: number
    classAttr: string
    clause: string
    commonName: string
    createDate: number
    customAttr: string
    descField: string
    description: string
    dummyType: string
    freightTmpId: number
    goodsTagsName: string
    id: number
    isOrderRate: string
    isRx: number
    itemBatch: string
    itemFactory: string
    itemName: string
    manageNo: string
    onSellDate: number
    origNum: number
    overseaType: number
    itemSpec: string
    keyWords: string
    pageImgs: [
        {
            imgId: number
            imgPath: string
            seqNo: number
        }
    ]
    parentId: number
    pic: string
    productServDesc: string
    provinceId: number
    retailPrice: number //
    // searchKeyWords: string
    // shopNo: string,
    skuNum: number,
    // soldNum: number,
    standard: string
    status: string
    totalNum: number
    updateDate: number
}

/**
 * 删除商品的请求Headers
 */
export interface DeleteRequest {
    header: Header
    body: {
        actionType: string,
        productUuit: string
    }
}

/**
 * 添加商品的请求
 */
export interface AddRequest {
    header: Header
    body: AddBody
}


/**
 * 正则替换url中的域名
 * @param regExp 正则匹配条件
 * @param str 需要匹配的字符串
 */
export function regexSplit(regExp: RegExp, str: string): Array<string> {
    let matchResult: Array<string>
    let resultList: Array<string> = []
    console.log("regexSplit(...params)：正在解析图片...")
    while ((matchResult = regExp.exec(str)) !== null) {
        if (matchResult[1].match(/(\/\/(img(\d+\.360buyimg|\.alicdn)\.com|static\.pharmakeyring\.com)\/([-a-zA-Z0-9@:%_\+.~#?!&/=]+)\.(jpg|bmg|jpeg|png|gif$))/g)) {
            matchResult[1] = matchResult[1].replace("static.pharmakeyring.com", "cdn2.jxjsyyjt.com")
        }
        resultList.push(matchResult[1])
    }
    console.log("图片解析成功！")
    return resultList
}