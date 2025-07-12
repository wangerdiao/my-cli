import logSymbols from 'log-symbols'; //脚手架打印文字前面有图标的库
export const log = {
    success: (message: string) => {
        console.log(logSymbols.success, message);
    },
    error: (message: string) => {
        console.log(logSymbols.error, message);
    },
    info: (message: string) => {
        console.log(logSymbols.info, message);
    },
    warn: (message: string) => {
        console.log(logSymbols.warning, message);
    },
};
export default log;