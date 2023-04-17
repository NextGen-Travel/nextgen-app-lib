import inquirer from 'inquirer'
import simpleGit from 'simple-git'
import { exec, log } from './tools'

const main = async() => {
    const git = simpleGit()
    const print = log.print.bind(log)
    const { current } = await git.branch()
    print('正在檢查程式碼...')
    const testResult = await exec([
        'yarn test'
    ])
    if (testResult.find(e => e.match('problem'))) {
        return print('程式碼有需修正的地方。', { color: 'red' })
    }
    print(`正在部署版本: ${current}`)
    const { mode, message } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            message: '選擇修正類型',
            choices: ['feat', 'fix']
        },
        {
            type: 'input',
            name: 'message',
            message: '請輸入部署訊息：',
        }
    ])
    const commitMessage = `${mode}: ${message || '例行更新'}@${Math.floor(Date.now() / 1000)}`
    print('正在推上 git ...')
    print(`commit message 為： ${commitMessage}`)
    await git.add('.')
    await git.commit(commitMessage)
    await git.push()
    print('部署完成。')
    print(`可引用： { "nextgen-app-lib": "git+https://github.com/NextGen-Travel/nextgen-app-lib.git#${current}" }`)
    print('或是透過升級： yarn upgrade nextgen-app-lib')
}

main()
