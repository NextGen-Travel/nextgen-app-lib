import '../index'
import { Capacitor } from '@capacitor/core'
import { AppUpdate } from '@capawesome/capacitor-app-update'

export class AppUpdateManager {
    static async hasNewVersion() {
        let IsApp = Capacitor.isNativePlatform()
        if (IsApp) {
            try {
                const { currentVersion, availableVersion } = await AppUpdate.getAppUpdateInfo()
                return currentVersion !== availableVersion
            } catch (error) {
                return false
            }
        } else {
            return false
        }
    }

    static async openAppStore() {
        await AppUpdate.openAppStore()
    }
}
