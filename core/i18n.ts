import { I18n } from 'power-helper'
import { Locales } from './locales'

const flatObj = (data: Record<string, any>) => {
    let output: any = {}
    for (let key in data) {
        output[`ng-app.${key}`] = data[key]
    }
    return output
}

export type Locales = 'en-US' | 'zh-TW' | 'zh-CN'

export const i18n = new I18n<Locales, `ng.${keyof typeof Locales['zh-TW']}`>({
    def: 'en-US',
    locales: {
        'en-US': flatObj(Locales['en-US']),
        'zh-TW': flatObj(Locales['zh-TW']),
        'zh-CN': flatObj(Locales['zh-CN'])
    }
})
