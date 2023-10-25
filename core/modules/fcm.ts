import '../index'
import { Event } from 'power-helper'
import { FirebaseMessaging, Notification } from '@capacitor-firebase/messaging'

// TOOD: 有實際需求的時候再處理後續

/**
 * @see https://capacitorjs.com/docs/apis/push-notifications
 * @see https://github.com/capacitor-community/fcm
 */

const event = new Event<{
    // 在應用程師外收到通知，點擊通知後會觸發
    'notificationActionPerformed': {
        notification: Notification
    }
    // 在應用程師內收到通知
    'notificationReceived': {
        notification: Notification
    }
}>()

export class FcmManager {
    static async install() {
        const result = await FirebaseMessaging.requestPermissions()
        await FirebaseMessaging.addListener('notificationActionPerformed', ({ notification }) => {
            event.emit('notificationActionPerformed', {
                notification: notification
            })
        })
        await FirebaseMessaging.addListener('notificationReceived', ({ notification }) => {
            event.emit('notificationReceived', {
                notification: notification
            })
        })
        return result.receive
    }
    static get on() {
        return event.on.bind(event)
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
