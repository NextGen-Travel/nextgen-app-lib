import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
export class BrowserManager {
    static open(url: string, nameType: '_blank' | '_system' = '_blank') {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            Browser.open({
                url,
                windowName: nameType
            })
            return {}
        } else {
            window.open(url, nameType)
            return {}
        }
    }
}
