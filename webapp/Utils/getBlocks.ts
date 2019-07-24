const fs = require('fs');
const path = require('path');
const process = require('process');
import appPath from './path';

function readBlockInfo(dir: string){
    try{
        const rcFile = fs.readFileSync(dir + 'blockConfig.json');
        const rcPkg = JSON.parse(rcFile.toString())
        return rcPkg;
    }catch (e) {
        console.error('读取物料配置错误：', e);
    }
}

function getBlocks(){
    var ignore = ['.DS_Store']; // 忽略某些文件夹
    const pathdir = path.resolve(appPath, './materials/components/');
    const blocksFiles = fs.readdirSync(pathdir);
    const blocks = [];

    try{
        blocksFiles.forEach((file) => {
            if(ignore.indexOf(file)){
                const stat = fs.statSync(pathdir + '/' + file);
                if(stat.isDirectory()){
                    blocks.push(readBlockInfo(pathdir + '/' + file + '/'));
                }
            }
        });
    }catch (e) {
        console.error('读物物料目录错误：', e)
    }

    return blocks;
}

export default getBlocks();