import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update'
const program = new Command('wangderful-cli')

//版本号
program.version(version,'-v --version')

//更新脚手架
program.command('update').description('更新脚手架 wangderful-cli').action(async () => {
  await update()
})

//创建项目
program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (name) => {
    create(name)
    return
    if(name) console.log(`create ${name}`)
    else console.log(`create command`)
  });

program.parse()