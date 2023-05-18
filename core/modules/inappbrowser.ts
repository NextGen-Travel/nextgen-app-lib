import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { AppLauncher } from '@capacitor/app-launcher'
export class BrowserManager {
    static open(url: string, nameType: '_blank' | '_system' = '_blank') {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            if (nameType === '_system') {
                AppLauncher.openUrl({
                    url
                })
            } else {
                Browser.open({
                    url
                })
            }
            return {}
        } else {
            window.open(url, nameType)
            return {}
        }
    }
}
