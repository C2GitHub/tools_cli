#!/usr/bin/env node --harmony

const program = require('commander');
const path = require('path');
program.version(require('../package.json').version);

// 设置当前执行node命令是的文件路径
process.env.PROJICT_PATH = process.cwd();

program
  .command('module')
  .alias('m')
  .description('创建新的模块')
  .option('-n, --name [moduleName]', '模块名称')
  .action((option) => {
    console.log('Hello World', option.name);
  });

program
  .command('init')
  .description('初始化项目')
  .action(() => {
    require('../command/init.js');
  });

program.parse(process.argv);
