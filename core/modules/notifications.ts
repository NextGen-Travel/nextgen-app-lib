import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'

type Notification = {
    body: string
    title: string
}

type NotificationPermission = {
    pass: boolean
    failType: 'unknown' | 'none'
}

export class NotificationManager {
    static async requestPermissions(): Promise<NotificationPermission> {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            let result = await LocalNotifications.requestPermissions()
            if (result.display === 'granted') {
                return {
                    pass: true,
                    failType: 'none'
                }
            }
        } else if (window.Notification) {
            let result = await Notification.requestPermission()
            if (result === 'granted') {
                return {
                    pass: true,
                    failType: 'none'
                }
            }
        }
        return {
            pass: false,
            failType: 'unknown'
        }
    }

    static async single(item: Notification) {
        let pass = (await NotificationManager.requestPermissions()).pass
        if (pass) {
            let IsApp = Capacitor.isNativePlatform()
            if (IsApp) {
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            id: Date.now(),
                            ...item
                        }
                    ]
                })
            } else if (window.Notification) {
                // eslint-disable-next-line no-new
                new Notification(item.title, {
                    body: item.body
                })
            }
        }
    }
}
