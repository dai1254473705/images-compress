
const compress = require('./compress');
const CONFIG = require('./config');
const fs = require("fs");
const path = require('path');
const colors = require('colors');
// 读取文件
const findDir = async()=>{
    const filePaths = fs.readdirSync(CONFIG.entry);
    const fileLength = filePaths.length;
    console.log(filePaths);
    for (let i=0;i<fileLength;i++){
        const pathItem = filePaths[i];
        // 判断是否符合图片类型
        if (!/\.jpeg$|\.jpg$|\.png$/ig.test(pathItem)) {
            console.log(colors.red(pathItem + '不符合recive'));
            continue;
        }
        if (i+1 < CONFIG.start) {
            console.log(colors.red(pathItem + '不符合start'));
            continue;
        }
        // 如果图片已经存在，就跳过
        if (CONFIG.jumpExit) {
            const isExit = fs.existsSync(path.resolve(CONFIG.output, pathItem));
            if (isExit) {
                // console.log(colors.red(pathItem + '不符合isExit'));
                continue;
            }
        }
        console.log(colors.yellow(`开始进行第：${i+1}张图片${pathItem}，处理中……`));
        compress(pathItem);
    }
}
findDir();