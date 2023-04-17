import childProcess from 'child_process'
import { Log, text } from 'power-helper'

export const log = new Log('deploy')

export const exec = (commands: string[]): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const outpus: string[] = []
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
        exec.stdout?.on('data', message => {
            console.log(message.toString())
            outpus.push(message.toString())
        })
            .on('end', () => {
                resolve(outpus)
            })
    })
}
