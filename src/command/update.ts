import process from 'child_process';
import chalk from 'chalk';
import ora from 'ora'; //脚手架更新加载动画

const spinner = ora({
    text: 'wangderful-cli 正在更新....',
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) => chalk.blue(item)),
    },
});

export function update() {
    spinner.start();
    process.exec('npm install wangderful-cli@latest -g', (error) => {
        spinner.stop();
        if (!error) {
            console.log(chalk.green('wangderful-cli更新成功'));
        } else {
            console.log(chalk.red(error));
        }
    });
}