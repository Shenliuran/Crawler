import axios from "axios";

export const https = axios.create()

/**
 * 请求延迟
 * @param ms 请求延迟的时长：延迟ms秒发送下一个请求
 */
export async function sleep(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms))
}