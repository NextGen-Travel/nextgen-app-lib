#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const setup = require('./setup')
const { prompt } = require('inquirer')

let mode = process.argv[2]

const main = async() => {
    if (mode == null) {
        let { selected } = await prompt([
            {
                type: 'list',
                name: 'selected',
                message: '你要做什麼？',
                default: '',
                choices: [
                    'setup'
                ]
            }
        ])
        mode = selected
    }
    if (mode === 'setup') {
        await setup()
    }
}

main()
