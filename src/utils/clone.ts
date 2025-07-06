
import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git';  //拉取git地址的库
import createLogger from 'progress-estimator'; //下载进度条
import chalk from 'chalk'; //改变终端颜色字体的库
// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
            // console.info(item)
            chalk.green(item)
        ),
        // frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    },
});

//定义下载配置，Partial为TS语法糖，可以让参数变为可选参数
const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 当前工作目录
    binary: 'git', // 指定 git 二进制文件路径
    maxConcurrentProcesses: 6, // 最大并发进程数
};

export async function clone (url: string, projectName: string, options: string[]) {
    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中: ', {
            estimate: 7000, // 预计下载时间
        });
        // 下面就是一些相关的提示
        console.log();
        console.log(chalk.green(`==================================`));
        console.log(chalk.green(`=== 欢迎使用 vue3+TS模板仓库 ===`));
        console.log(chalk.green(`==================================`));
        console.log();

    } catch (error) {
        console.log(chalk.red('代码下载失败'));
        // console.log('下载失败');
    }
}