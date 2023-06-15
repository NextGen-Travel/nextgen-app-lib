// FIXME: 這個行為是保證 app_state 有被初始化
import '../index'
import { t } from '../index'
import { Capacitor } from '@capacitor/core'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

type BarcodeScannerPermission = {
    pass: boolean
    failType: 'no_permission' | 'none' | 'unknown' | 'only_app'
}

window.__ng_app_state.barcodeScanner = {
    scanning: false
}

export class BarcodeScannerManager {
    static async requestPermissions(): Promise<BarcodeScannerPermission> {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await BarcodeScanner.checkPermission({
                force: true
            })
            if (result.granted) {
                return {
                    pass: true,
                    failType: 'none'
                }
            }
            if (result.denied) {
                let res = confirm(t('RequestCameraPermission'))
                if (res) {
                    BarcodeScanner.openAppSettings()
                }
                return {
                    pass: false,
                    failType: 'no_permission'
                }
            }
            if (result.neverAsked) {
                let res = confirm(t('FirstRequestCameraPermission'))
                if (res === false) {
                    return {
                        pass: false,
                        failType: 'no_permission'
                    }
                }
            }
        }
        return {
            pass: false,
            failType: 'only_app'
        }
    }

    static async openBarcodeScanner(targetElement = document.body) {
        let pass = (await BarcodeScannerManager.requestPermissions()).pass
        if (pass) {
            let originDisplay = targetElement.style.display
            let originBackground = targetElement.style.background
            BarcodeScanner.hideBackground()
            targetElement.style.display = 'none'
            targetElement.style.background = 'transparent'
            try {
                window.__ng_app_state.barcodeScanner.scanning = true
                let result = await BarcodeScanner.startScan()
                if (result.hasContent) {
                    return {
                        data: result.content
                    }
                }
            } finally {
                BarcodeScannerManager.stopBarcodeScanner(targetElement, originDisplay, originBackground)
            }
        }
        return {
            data: null
        }
    }

    static stopBarcodeScanner(targetElement = document.body, originDisplay = 'block', originBackground = 'transparent') {
        targetElement.style.display = originDisplay
        targetElement.style.background = originBackground
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
        window.__ng_app_state.barcodeScanner.scanning = false
    }

    static isScanning() {
        return window.__ng_app_state.barcodeScanner.scanning
    }
}
