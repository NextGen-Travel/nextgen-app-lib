// 由於綁定的時候需要辨識 app SHA1，建立 apk 的時候需要綁定 keystore
// 金鑰湊雜生成的方法
// https://ithelp.ithome.com.tw/articles/10256558
import '../index'
import { FacebookLogin } from '@capacitor-community/facebook-login'

export class AppFacebookLogin {
    static async signIn() {
        const FACEBOOK_PERMISSIONS = [
            'email',
            'user_birthday',
            'user_photos',
            'user_gender'
        ]
        const result = await FacebookLogin.login({
            permissions: FACEBOOK_PERMISSIONS
        })
        return result
    }
}
