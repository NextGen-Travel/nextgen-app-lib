import { App } from '@capacitor/app'
import { Event } from 'power-helper'
import { Capacitor } from '@capacitor/core'
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings'

type Events = {
    appUrlOpen: {
        url: string
    }
    backButton: {
        canGoBack: boolean
    }
}

window.__ng_app_state.app = {
    launchUrl: location.href,
    globEvent: new Event<Events>()
}

export class AppManager {
    static platform() {
        return Capacitor.getPlatform() as 'web' | 'android' | 'ios'
    }

    static isApp() {
        return Capacitor.isNativePlatform()
    }

    static openSetting() {
        return NativeSettings.open({
            optionAndroid: AndroidSettings.ApplicationDetails,
            optionIOS: IOSSettings.App
        })
    }

    static get event(): Event<Events> {
        return window.__ng_app_state.app?.globEvent
    }

    static async getLaunchUrl() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await App.getLaunchUrl()
            return result?.url || window.__ng_app_state.app.launchUrl
        } else {
            return window.__ng_app_state.app.launchUrl
        }
    }

    static async installListener() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            await App.addListener('appUrlOpen', (data) => {
                AppManager.event.emit('appUrlOpen', data)
            })
            await App.addListener('backButton', (data) => {
                AppManager.event.emit('backButton', data)
                return false
            })
        }
    }
}
