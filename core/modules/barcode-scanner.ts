import { Capacitor } from '@capacitor/core'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

type BarcodeScannerPermission = {
    pass: boolean
    failType: 'no_permission' | 'none' | 'unknown'
}

export class BarcodeScannerManager {
    static async requestPermissions(): Promise<BarcodeScannerPermission> {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await BarcodeScanner.checkPermission({ force: true })
            if (result.granted) {
                return {
                    pass: true,
                    failType: 'none'
                }
            }
            if (result.denied) {
                let res = confirm('If you want to grant permission for using your camera, enable it in the app settings.')
                if (res) {
                    BarcodeScanner.openAppSettings()
                }
                return {
                    pass: false,
                    failType: 'no_permission'
                }
            }
            if (result.neverAsked) {
                let c = confirm('We need your permission to use your camera to be able to scan barcode')
                if (c === false) {
                    return {
                        pass: false,
                        failType: 'no_permission'
                    }
                }
            }
        }
        return {
            pass: false,
            failType: 'unknown'
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
