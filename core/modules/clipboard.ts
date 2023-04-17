import { Clipboard } from '@capacitor/clipboard'
import { Capacitor } from '@capacitor/core'

export class ClipboardManager {
    static async write(text: string) {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            await Clipboard.write({
                string: text
            })
        } else {
            if (navigator.clipboard && window.isSecureContext) {
                // 只有在安全域名下才可以訪問
                await navigator.clipboard.writeText(text)
            } else {
                let textArea = document.createElement('textarea')
                textArea.value = text
                textArea.style.position = 'absolute'
                textArea.style.opacity = '0'
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                return new Promise((resolve) => {
                    // 執行複製及移除文本的內容
                    if (document.execCommand('copy')) {
                        resolve(null)
                    }
                    textArea.remove()
                })
            }
        }
    }

    static async read() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            await Clipboard.read()
        } else {
            if (navigator.clipboard && window.isSecureContext) {
                // 只有在安全域名下才可以訪問
                await navigator.clipboard.readText()
            } else {
                document.execCommand('paste')
            }
        }
    }
}
