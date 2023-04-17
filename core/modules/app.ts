import { App } from '@capacitor/app'
import { Event } from 'power-helper'
import { Capacitor } from '@capacitor/core'

const LocalLaunchUrl = location.href

type Channels = {
    appUrlOpen: {
        url: string
    }
}

export class AppManager extends Event<Channels> {
    appEvents: Array<{ remove: () => void }> = []
    async getLaunchUrl() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await App.getLaunchUrl()
            return result?.url || LocalLaunchUrl
        } else {
            return LocalLaunchUrl
        }
    }

    async startListener() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            this.appEvents.push(
                await App.addListener('appUrlOpen', (data) => {
                    this.emit('appUrlOpen', data)
                })
            )
        }
    }

    closeListener() {
        this.appEvents.forEach(e => e.remove())
    }
}
