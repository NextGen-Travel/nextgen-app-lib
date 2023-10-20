import '../index'
import { FirebaseMessaging } from '@capacitor-firebase/messaging'

// TOOD: 有實際需求的時候再處理後續
/**
 * @see https://capacitorjs.com/docs/apis/push-notifications
 * @see https://github.com/capacitor-community/fcm
 */
export class FcmManager {
    static async install() {
        const result = await FirebaseMessaging.requestPermissions()
        return result.receive
    }
    static async clear() {
        const hasToken = await FirebaseMessaging.getToken()
        if (hasToken) {
            await FirebaseMessaging.deleteToken()
        }
    }
    static subscribeTo(topic: string) {
        return FirebaseMessaging.subscribeToTopic({
            topic
        })
    }
    static unsubscribeFrom(topic: string) {
        return FirebaseMessaging.unsubscribeFromTopic({
            topic
        })
    }
}
