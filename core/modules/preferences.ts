import '../index'
import { Preferences } from '@capacitor/preferences'

export class PreferencesManager {
    static exportObject() {
        return {
            keys: async() => {
                const { keys } = await Preferences.keys()
                return keys
            },
            getItem: async (key: string) => {
                const { value } = await Preferences.get({ key })
                return value
            },
            setItem: async (key: string, value: any) => {
                await Preferences.set({
                    key,
                    value
                })
            },
            removeItem: async (key: string) => {
                return Preferences.remove({ key })
            }
        }
    }
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
    static async size() {
        const keys = await Preferences.keys()
        return keys.keys.length
    }
}
