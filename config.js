const path = require('path');
const CONFIG = {
    entry: path.resolve(__dirname,'images'),
    output: path.resolve(__dirname,'dist'),
    maxLarge: 1920,
    quality: 100,
    start: 1, // 从第几张图片开始，中间出错后，可以接上面操作
    jumpExit: true,//跳过已经存在的图片
};
module.exports = CONFIG;