import { Capacitor } from '@capacitor/core'
export class BrowserManager {
    static open(url: string, nameType: '_blank' | '_system' = '_blank') {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            const target = window.cordova.InAppBrowser.open(url, nameType)
            return {
                close: () => target.close(),
                onMessage(cb: (_event: WindowEventMap['message']) => void) {
                    target?.addEventListener('message', cb)
                    return {
                        off: () => {
                            target?.removeEventListener('message', cb)
                        }
                    }
                }
            }
        } else {
            const target = window.open(url, nameType)
            return {
                close: () => target?.close(),
                onMessage(cb: (_event: WindowEventMap['message']) => void) {
                    target?.addEventListener('message', cb)
                    return {
                        off: () => {
                            target?.removeEventListener('message', cb)
                        }
                    }
                }
            }
        }
    }

    static postParentMessage(data: Record<string, any>) {
        if (window.webkit?.messageHandlers?.cordova_iab?.postMessage) {
            window.webkit?.messageHandlers?.cordova_iab?.postMessage(JSON.stringify(data))
        } else if (window.opener) {
            (window.opener as Window).postMessage(data)
        } else {
            window.parent.postMessage(data)
        }
    }
}
