# 爬虫

## 环境配置

+ 使用PyCharm运行
+ NodeJs: **v14.17.0**
+ Typescript: **4.2.2**
+ npm: **7.15.0**

## 项目配置

### 项目初始化

1. clone后，运行 npm install
2. 在项目根目录，创建logs，resource、out文件夹

### 项目结构

+ logs: 日志文件，使用log4js
+ out: 最后发送给万年松商城后台的完整数据报
+ resource: 资源文件
+ src：项目运行文件
    + components: 使用的第三方组件，如log4js，axios
    + config: 爬虫配置文件
    + modules: 爬虫核心部分
      + Impl: Request接口实现
      + crawler.ts:爬虫对象
      + excelAnalyze.ts: excel数据解析
      + httpAnalyze.ts: http请求接口
      + regexAnalyze.ts: 正则表达式分析
    + utils: 数据爬取工具函数
    + request: 请求数据报头
    + main.ts: 项目运行文件
+ template: 所爬取的对象请求体
+ test: 测试文件
+ clean_output.sh: 清除输出结果
+ clean_count.sh: 清除输出统计

### 运行配置

1. 在config/excelConfig.ts文件中配置excel数据解析对象，与excel表格的对应关系
2. 在config/requestConfig.ts文件中配置请求参数
3. 若需要修改图片解析正则，可以在regexConfig.ts中进行配置
4. 在template中配置需要爬取对象商城的请求模板
5. 在main.ts中配置请求模板

## 建议

1. 在使用之前，强烈建议，先使用verify函数进行验证，及禁用main函数，启用verify函数
2. 在out中，对请求数据报进行验证
