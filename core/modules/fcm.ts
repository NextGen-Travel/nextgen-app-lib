import { FCM } from '@capacitor-community/fcm'
import { PushNotifications } from '@capacitor/push-notifications'

export class FcmManager {
    static async install() {
        await PushNotifications.requestPermissions()
        await PushNotifications.register()
        FCM.subscribeTo({ topic: "test" })
            .then((r) => alert(`subscribed to topic`))
            .catch((err) => console.log(err));
    }
}
