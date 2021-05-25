import {logsys} from "../components/log4js";
import {https} from "../components/axios"

export default class Crawler {
    private productId: string/** 商品编码 *///请求参数
    private router: string // 请求路由
    public crawledResult: any = null

    public set setRouter(router: string) { this.router = router }
    public set setProductId(productId: string) { this.productId = productId }

    public get getProductId(): string { return this.productId }



    /**
     * 爬取目标网站内容
     * @param fileName 存放文件的文件名
     * @param fileSuffixes 文件名后缀
     *
     */
    public async crawling(fileName: string, fileSuffixes: string) {
        await https.get(
            this.router,
            {
                params: {
                    productId: this.productId
                }
            },
        ).then(response => {
            if (response.data !== null) {
                this.crawledResult = response.data.data.data.goodsInfos
            } else {
                let logger = logsys.getLogger("info")
                logger.info("商品ID：" + this.productId + " 扒取失败")
            }
        }).catch(error => {
            let logger = logsys.getLogger("error")
            logger.error("商品ID：" + this.productId + " 扒取失败")
        })
    }
}
