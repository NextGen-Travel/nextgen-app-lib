import { Clipboard } from '@capacitor/clipboard'
import { Capacitor } from '@capacitor/core'

function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(typeof event.target?.result === 'string' ? event.target.result : '')
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

/** 將圖片, 影片, canvas 轉成 blob */
function sourceToBlob(source: Blob | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
        if (source instanceof Blob) {
            resolve(source)
        } else {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            if (source instanceof HTMLImageElement) {
                const image = new Image()
                image.onload = () => {
                    canvas.width = image.width
                    canvas.height = image.height
                    context?.drawImage(image, 0, 0)
                    canvas.toBlob(blob => resolve(blob!), 'image/jpeg')
                };
                image.onerror = reject
                image.src = source.src
            }
            if (source instanceof HTMLCanvasElement) {
                canvas.width = source.width
                canvas.height = source.height
                context?.drawImage(source, 0, 0)
                canvas.toBlob(blob => resolve(blob!), 'image/jpeg')
            }
            if (source instanceof HTMLVideoElement) {
                canvas.width = source.videoWidth
                canvas.height = source.videoHeight
                context?.drawImage(source, 0, 0)
                canvas.toBlob(blob => resolve(blob!), 'image/jpeg')
            }
        }
    })
}

/** 剪貼簿設計，兼容所有平台 */
export class ClipboardManager {
    /** 複製文本 */
    static async write(content: string | Blob | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
        let IsApp = Capacitor.isNativePlatform()
        let source = typeof content === 'string' ? content : await sourceToBlob(content)
        if (IsApp) {
            if (typeof source === 'string') {
                await Clipboard.write({
                    string: source
                })
            } else {
                const dataUrl = await blobToDataURL(source)
                await Clipboard.write({
                    image: dataUrl
                })
            }
        } else {
            if (navigator.clipboard && window.isSecureContext) {
                if (typeof source === 'string') {
                    await navigator.clipboard.writeText(source)
                } else {
                    const item = new ClipboardItem({
                        [source.type]: source
                    })
                    await navigator.clipboard.write([item])
                }
            } else {
                const text = typeof source === 'string' ? source : await blobToDataURL(source)
                const textarea = document.createElement('textarea')
                textarea.value = text
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                textarea.remove()
            }
        }
    }

    /** 讀取文本 */ 
    static async read() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            await Clipboard.read()
        } else {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.read()
            } else {
                document.execCommand('paste')
            }
        }
    }
}
