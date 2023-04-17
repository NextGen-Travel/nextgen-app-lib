/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process')
const { Log, text } = require('power-helper')

const log = new Log('Nextgen Build')

module.exports = {
    log,
    run: (cb) => cb(),
    rootPath: (path) => `./${path}`,
    platform: () => {
        if (process.platform === 'win32') {
            return 'Windows'
        }
        if (process.platform === 'darwin') {
            return 'MacOS'
        }
        return 'Linux'
    },
    /**
     * @param {string[]} commands 
     */
    exec: (commands) => {
        return new Promise((resolve, reject) => {
            const command = commands.join(' && ')
            const exec = childProcess.exec(command, { encoding: 'buffer' })
            log.print(command, { color: 'yellow' })
            exec.stderr?.on('data', message => {
                if (text.headMatch(message.toString().trim(), 'fatal')) {
                    log.print(message.toString(), {
                        color: 'red'
                    })
                    reject('Fail!')
                } else if (text.headMatch(message.toString().trim(), 'warning')) {
                    log.print(message.toString(), {
                        color: 'yellow'
                    })
                } else {
                    log.print(message.toString())
                }
            })
            exec.stdout?.on('data', message => console.log(message.toString()))
                .on('end', () => {
                    resolve(null)
                })
        })
    },
}
