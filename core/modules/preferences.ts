import '../index'
import { Preferences } from '@capacitor/preferences'

export class PreferencesManager {
    static getItem(key: string) {
        return Preferences.get({
            key
        })
    }
    static setItem(key: string, value: string) {
        return Preferences.set({
            key,
            value
        })
    }
    static removeItem(key: string) {
        return Preferences.remove({
            key
        })
    }
    static clear() {
        return Preferences.clear()
    }
    static async keys() {
        const keys = await Preferences.keys()
        return keys.keys
    }
    static async length() {
        const keys = await Preferences.keys()
        return keys.keys.length
    }
}
