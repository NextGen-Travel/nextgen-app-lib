// android 很多坑，照著填才有用
// https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/220

// 由於綁定的時候需要辨識 app SHA1，建立 apk 的時候需要綁定 keystore

// https://developers.google.com/identity/sign-in/ios/start-integrating?hl=zh-tw
// CFBundleURLSchemes 要加上 反向 app id: https://github.com/CodetrixStudio/CapacitorGoogleAuth/blob/master/demo/ios/App/App/Info.plist
// capacitor.config.ts 要加上 plugins.GoogleAuth.iosClientId: https://github.com/CodetrixStudio/CapacitorGoogleAuth/blob/master/demo/capacitor.config.json
import '../index'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

export class AppGoogleLogin {
    static async initialize() {
        GoogleAuth.initialize({
            scopes: ['profile', 'email']
        })
    }

    static async signIn() {
        const response = await GoogleAuth.signIn()
        return response
    }
}
