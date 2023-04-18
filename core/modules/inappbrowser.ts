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
            return {
                close: () => Browser.close()
            }
        } else {
            const target = window.open(url, nameType)
            return {
                close: () => target?.close()
            }
        }
    }
}
