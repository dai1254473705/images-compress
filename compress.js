const images = require("images");
const path = require('path');
const colors = require('colors');
const CONFIG = require('./config');

const compress = (pathName)=>{
    const pathItem = path.resolve(CONFIG.entry, pathName);
    const outputPath = path.resolve(CONFIG.output, pathName);
    const file = images(pathItem);
    const width = file.width();
    const height = file.height();
    // 竖幅
    const isVertical = height > width;
    // 是否需要压缩
    const needCopress = isVertical ? height > CONFIG.maxLarge : width > CONFIG.maxLarge;
    // 不需要压缩直接结束
    if (!needCopress) {
        file.save(outputPath, {
            quality : CONFIG.quality,
        });
        return;
    }
    const rate = isVertical ? (height / CONFIG.maxLarge) : ( width / CONFIG.maxLarge);
    const newWidth = isVertical ? Number((width / rate).toFixed(0)) : CONFIG.maxLarge;
    const newHeight = isVertical ? CONFIG.maxLarge : Number((height / rate).toFixed(0));
    file.size(newWidth,newHeight);
    file.save(outputPath, {
        quality : CONFIG.quality,
    });
    console.log(colors.green(`============ 开始进行第：${pathName}处理完成 ============`));
}
module.exports = compress;