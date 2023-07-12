import { I18n } from 'power-helper'
import { Locales } from './locales'

export type Locales = 'en-US' | 'zh-TW' | 'zh-CN'
export const i18n = new I18n<Locales, keyof typeof Locales['zh-TW']>({
    def: 'en-US',
    locales: {
        'en-US': Locales['en-US'],
        'zh-TW': Locales['zh-TW'],
        'zh-CN': Locales['zh-CN']
    }
})
