import {logsys} from "../components/log4js";
import {https} from "../components/axios"

/**
 * 请求参数列表
 */
interface RequestParams {
    [name: string]: any
}

/**
 * 爬虫对象定义
 */
export default class Crawler {
    private _params: RequestParams = {}//请求参数
    private _router: string = ""// 请求路由
    private _crawlingKey: any = undefined
    public crawledResult: any = null //扒取结果原格式

    public set router(router: string) { this._router = router }
    public set params(params: RequestParams) { this._params = params }
    public set crawlingKey(crawlingKey: any) { this._crawlingKey = crawlingKey }

    public get router(): string { return this._router }
    public get params(): RequestParams { return this._params }



    /**
     * 爬取目标网站内容
     *
     */
    public async crawling() {
        await https.get(
            this.router,
            {
                params: this._params
            },
        ).then(response => {
            if (response.data !== null) {
                this.crawledResult = response.data
            } else {
                let logger = logsys.getLogger("info")
                logger.info("爬取参数：" + this._params + " 扒取失败!")
            }
        }).catch(error => {
            logsys.getLogger("error").error(error  + "\n爬取参数：" + this._params[this._crawlingKey] + " 扒取失败!")
        })
    }
}
