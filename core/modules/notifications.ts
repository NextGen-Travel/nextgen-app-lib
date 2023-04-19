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

function randId() {
    const min = -2147483647
    const max = 2147483646
    return Math.floor(Math.random() * (max - min + 1)) + min
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
        }
        if (window.Notification) {
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
                            id: randId(),
                            ...item
                        }
                    ]
                })
            } else if (window.Notification) {
                new Notification(item.title, {
                    body: item.body
                })
            }
        }
    }
}
