import { t } from '../index'
import { Capacitor } from '@capacitor/core'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

type BarcodeScannerPermission = {
    pass: boolean
    failType: 'no_permission' | 'none' | 'unknown' | 'only_app'
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
                let result = await BarcodeScanner.startScan()
                if (result.hasContent) {
                    return {
                        data: result.content
                    }
                }
            } catch (e) {
                BarcodeScanner.stopScan()
            } finally {
                BarcodeScanner.showBackground()
                targetElement.style.display = originDisplay
                targetElement.style.background = originBackground
            }
        }
        return {
            data: null
        }
    }

    static stopBarcodeScanner(targetElement = document.body) {
        targetElement.style.display = 'block'
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
    }
}
