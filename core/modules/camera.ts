import { Capacitor } from '@capacitor/core'
import { Camera, CameraResultType } from '@capacitor/camera'

type CameraPermission = {
    pass: boolean
    failType: 'no_permission' | 'none' | 'unknown'
}

export class CameraManager {
    static async requestPermissions(): Promise<CameraPermission> {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await Camera.checkPermissions()

            if (result.camera === 'granted') {
                return {
                    pass: true,
                    failType: 'none'
                }
            }
            if (result.camera === 'denied' || result.camera === 'prompt') {
                let res = confirm('If you want to grant permission for using your camera, enable it in the app settings.')
                if (res) {
                    Camera.requestPermissions()
                }
                return {
                    pass: false,
                    failType: 'no_permission'
                }
            }
        }
        return {
            pass: false,
            failType: 'unknown'
        }
    }

    static async takePicture() {
        let pass = (await CameraManager.requestPermissions()).pass
        if (pass) {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.Uri
            })
            return image.webPath
        }
        return {
            data: null
        }
    }
}
