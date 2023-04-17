import { Capacitor } from '@capacitor/core'
import { AppUpdate } from '@capawesome/capacitor-app-update'

export class AppUpdateManager {
    static async hasNewVersion() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            const { currentVersion } = await AppUpdate.getAppUpdateInfo()
            const { availableVersion } = await AppUpdate.getAppUpdateInfo()
            return currentVersion !== availableVersion
        } else {
            return false
        }
    }

    static async openAppStore() {
        await AppUpdate.openAppStore()
    }
}
