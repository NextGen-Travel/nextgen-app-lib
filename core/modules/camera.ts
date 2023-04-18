import { t } from '../index'
import { Capacitor } from '@capacitor/core'
import { serviceException } from '../error'
import { Camera, CameraResultType } from '@capacitor/camera'

type CameraPermission = {
    pass: boolean
    failType: 'no_permission' | 'none' | 'unknown' | 'only_app'
}

const exception = serviceException.checkout('CameraManager')

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
                let res = confirm(t('RequestCameraPermission'))
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
            failType: 'only_app'
        }
    }

    static async getPhoto() {
        let pass = (await CameraManager.requestPermissions()).pass
        if (pass) {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                promptLabelHeader: t('SelectPictureSource'),
                promptLabelCancel: t('Cancel'),
                promptLabelPhoto: t('Album'),
                promptLabelPicture: t('Camera')
            })
            return image.webPath
        }
        throw exception.create('Not in the app')
    }
}
