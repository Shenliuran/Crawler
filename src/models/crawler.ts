import {logsys} from "../components/log4js";
import {https} from "../components/axios"

/**
 * 请求参数列表
 */
interface RequestParams {
    [name: string]: any
}

/**
 * 爬虫定义
 */
export default class Crawler {
    private _params: RequestParams//请求参数
    private _router: string // 请求路由
    public crawledResult: any = null //扒取结果原格式

    public set router(router: string) { this._router = router }
    public set params(params: RequestParams) { this._params = params }

    public get params(): RequestParams { return this._params }



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
                params: this._params
            },
        ).then(response => {
            if (response.data !== null) {
                this.crawledResult = response.data.data.data.goodsInfos
            } else {
                let logger = logsys.getLogger("info")
                logger.info("爬取参数：" + this._params + " 扒取失败!")
            }
        }).catch(error => {
            let logger = logsys.getLogger("error")
            logger.error("爬取参数：" + this._params + " 扒取失败!")
        })
    }
}
