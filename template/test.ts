import {AddBody} from "../src/models/jsonAnalyze";

export const addProductTemplate_test: AddBody = {
    actionType: 'ADD',
    merchantDTO: {
        merchantUuid: '2c90bd0e78f911db017903ff614b001b'
    },
    productName: '',
    productNature: '0',
    memo: '',
    productCode: '',
    productBrief: '',
    productType: '1',
    skuEnabled: false,
    totalUnit: 987,
    unitPrice: 100,
    unitPriceStandard: 100,
    productCommonName: '',
    productWeight: 1,
    hot: false,
    new: 'false',
    productCateDTO: {
        productCateUuid: ''
    },
    attrList: [],
    onSale: 'true',
    deliveryExpressEnabled: true,
    deliveryCityEnabled: false,
    deliveryPickEnabled: false,
    productFreightDTO: {
        productFreightUuid: '2c90bd0e78f911db017904031f130021'
    },
    productMainImage: {
        fileName: 'yjk1-1',
        size: 37737,
        url: ''
    },
    productImages: [
        {
            fileName: 'yjk2-1',
            size: 37737,
            url: '',
        }
    ],
    productDescImages: [
        {
            fileName: 'yjk3-1',
            size: 37737,
            url: ''
        }
    ],
    productCostPrice: 100,
}