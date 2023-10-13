import '../index'
import { FCM } from '@capacitor-community/fcm'
import { PushNotifications } from '@capacitor/push-notifications'

// TOOD: 有實際需求的時候再處理後續
/**
 * @see https://capacitorjs.com/docs/apis/push-notifications
 * @see https://github.com/capacitor-community/fcm
 */
export class FcmManager {
    static async install() {
        await PushNotifications.requestPermissions()
        await PushNotifications.register()
    }
    static clearAll() {
        return FCM.deleteInstance()
    }
    static subscribeTo(topic: string) {
        return FCM.subscribeTo({
            topic
        })
    }
    static unsubscribeFrom(topic: string) {
        return FCM.unsubscribeFrom({
            topic
        })
    }
}
