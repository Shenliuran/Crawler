/**
 * 正则替换url中的域名
 * @param regExp 正则匹配条件
 * @param str 需要匹配的字符串
 */
export function regexSplit(regExp: RegExp, str: string): Array<string> {
    let matchResult: RegExpExecArray | null
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
