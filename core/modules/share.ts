import { Capacitor } from '@capacitor/core'
import { Share } from '@capacitor/share'

type ShareConfig = {
    title: string
    text?: string
    url?: string
}

export class ShareManager {
    static isSupport(): boolean {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            return true
        } else {
            return !!navigator.share
        }
    }

    static async share(config: ShareConfig) {
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
