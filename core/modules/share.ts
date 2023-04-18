import { t } from '../index'
import { Share } from '@capacitor/share'
import { Capacitor } from '@capacitor/core'
import { ClipboardManager } from './clipboard'

type ShareConfig = {
    title: string
    text?: string
    url?: string
}

export class ShareManager {
    static isSupportNative(): boolean {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            return true
        } else {
            return !!navigator.share
        }
    }

    static async share(config: ShareConfig) {
        if (ShareManager.isSupportNative() === false) {
            await ClipboardManager.write(config.url || '')
            confirm(t('Copyed'))
        } else {
            let IsApp = Capacitor.isNativePlatform()
            if (IsApp) {
                await Share.share({
                    title: config.title,
                    text: config.text,
                    url: config.url
                })
            } else {
                await navigator.share({
                    title: config.title,
                    text: config.text,
                    url: config.url
                })
            }
        }
    }
}
