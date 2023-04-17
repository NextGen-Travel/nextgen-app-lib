/* eslint-disable @typescript-eslint/no-var-requires */
const fsx = require('fs-extra')
const yargs = require('yargs')
const { text } = require('power-helper')
const { prompt } = require('inquirer')
const { rootPath } = require('./tools')

const options = yargs(process.argv)
    .option('env', {
        alias: 'e',
        type: 'string',
        description: 'select env'
    })
    .parse()

module.exports = async() => {
    let env = options.env
    let files = fsx.readdirSync(rootPath('.'))
    if (env == null) {
        const result = await prompt([
            {
                type: 'list',
                name: 'env',
                message: '選擇部署環境',
                choices: files.filter(e => text.headMatch(e, '.env') && e !== '.env').map(e => e.slice(5))
            }
        ])
        env = result.env
    }
    let envFile = files.find(e => e === `.env.${env}`)
    if (envFile) {
        fsx.copyFileSync(rootPath(`./${envFile}`), './.env')
    } else {
        throw new Error(`查無環境檔案: ${env}`)
    }
}
