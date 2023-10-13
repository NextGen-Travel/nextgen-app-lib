// 異常 1000: https://stackoverflow.com/questions/59321233/com-apple-authenticationservices-authorization-error-code-1000
import '../index'
import {
    SignInWithApple,
    SignInWithAppleResponse,
    SignInWithAppleOptions
} from '@capacitor-community/apple-sign-in'

window.__ng_app_state.appleLogin = {
    cliendId: ''
}

export class AppAppleLogin {
    static async install(params: {
        cliendId: string
    }) {
        window.__ng_app_state.appleLogin.cliendId = params.cliendId
    }
    static async signIn(params: {
        cliendId?: string
        redirectURI: string
    }) {
        const options: SignInWithAppleOptions = {
            clientId: params.cliendId ?? window.__ng_app_state.appleLogin.cliendId,
            redirectURI: params.redirectURI,
            scopes: 'email name',
            state: '',
            nonce: 'nonce'
        }
        const result: SignInWithAppleResponse = await SignInWithApple.authorize(options)
        return result.response
    }
}
