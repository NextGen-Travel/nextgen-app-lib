import { t } from '../index'
import { Capacitor } from '@capacitor/core'
import { AppManager } from './app'
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
            if (result.camera === 'prompt' || result.camera === 'prompt-with-rationale') {
                let result = await Camera.requestPermissions()
                if (result.camera === 'granted') {
                    return {
                        pass: true,
                        failType: 'none'
                    }
                }
                return {
                    pass: false,
                    failType: 'no_permission'
                }
            }
            if (result.camera === 'denied') {
                let res = confirm(t('RequestCameraPermission'))
                if (res) {
                    await AppManager.openSetting()
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

    static async getPhoto(options = {
        allowEditing: false
    }) {
        let { pass, failType } = await CameraManager.requestPermissions()
        if (pass) {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: options.allowEditing,
                resultType: CameraResultType.Base64,
                promptLabelHeader: t('SelectPictureSource'),
                promptLabelCancel: t('Cancel'),
                promptLabelPhoto: t('Album'),
                promptLabelPicture: t('Camera')
            })
            return `data:image/jpeg;base64,${image.base64String}` || ''
        }
        throw exception.create(failType)
    }
}
