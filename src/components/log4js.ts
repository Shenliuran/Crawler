import * as log4js from "log4js"

export var logsys = log4js.configure({
    appenders: {
        console: {type: "console"},
        error: {
            type: "dateFile",
            filename: "./logs/error/error",
            alwaysIncludePattern: true,
            pattern: "yyyy-MM-dd.log",
            daysToKeep: 5
        },
        debug: {
            type: "dateFile",
            filename: "./logs/debug/debug",
            alwaysIncludePattern: true,
            pattern: "yyyy-MM-dd.log"
        },
        info: {
            type: "dateFile",
            filename: "./logs/info/info",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            daysToKeep: 5
        },
        trace: {
            type: "dateFile",
            filename: "./logs/trace/trace",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            daysToKeep: 5
        },
        record: {
            type: "dateFile",
            filename: "./logs/record/record",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            daysToKeep: 10
        }
    },
    categories: {
        default: {
            appenders: ["console"],
            level: "ALL"
        },
        error: {
            appenders: ["console", "error"],
            level: "ERROR"
        },
        debug: {
            appenders: ["console", "debug"],
            level: "DEBUG"
        },
        info: {
            appenders: ["console", "info"],
            level: "INFO"
        },
        trace: {
            appenders: ["console", "trace"],
            level: "TRACE"
        },
        record: {
            appenders: ["console", "record"],
            level: "TRACE"
        }
    }
})

/***
 * npm run log_test
 * 测试
 */
// const err = log4js.getLogger("error")
// const consol =components.logsys.getLogger()
// consol.info("console message")
// err.error("error message")
