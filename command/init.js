const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const shell = require('shelljs');
const { promisify } = require('util');
const fs = require('fs');
const inquirer = require('inquirer');
const download = require('download-git-repo');

// 需要下载的仓库
const repoUri = 'github:pelican-workbench/any-utils';

// 存储文件的仓库
const targetDir = path.join(process.env.PROJICT_PATH, '/proj');

const CanICreate = (dir) => {
  return new Promise((resolve) => {
    if (fs.existsSync(dir)) {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'isCover',
            message: '已存在相同项目，是否覆盖?(y/n)',
            default() {
              return 'y';
            },
          },
        ])
        .then(({ isCover = '' }) => {
          if (isCover.toLowerCase() === 'y') {
            shell.rm('-rf', dir);
            console.log(chalk.green('[Remove]: 清除旧项目完成'));
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    } else {
      resolve(true);
    }
  });
};

// 下载仓库
const downloadRepo = async () => {
  console.log(chalk.green('[Start]: 开始下载仓库...'));
  const flag = await CanICreate(targetDir);
  if (flag) {
    download(repoUri, targetDir, {}, (err, data) => {
      if (err) {
        console.log(chalk.green('[Error]: 初始化仓库异常'));
      } else {
        shell.cd(targetDir);
        shell.exec('npm i');
        clear();
        console.log(chalk.green('[Success]: 初始化仓库成功'));
      }
    });
  }
};

// 执行初始化
downloadRepo();
