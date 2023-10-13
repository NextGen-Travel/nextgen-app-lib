// 異常 1000: https://stackoverflow.com/questions/59321233/com-apple-authenticationservices-authorization-error-code-1000
import '../index'
import {
    SignInWithApple,
    SignInWithAppleResponse,
    SignInWithAppleOptions
} from '@capacitor-community/apple-sign-in'

export class AppAppleLogin {
    static async signIn(params: {
        clientId: string
        redirectURI: string
    }) {
        const options: SignInWithAppleOptions = {
            clientId: params.clientId,
            redirectURI: params.redirectURI,
            scopes: 'email name',
            state: '',
            nonce: 'nonce'
        }
        const result: SignInWithAppleResponse = await SignInWithApple.authorize(options)
        return result.response
    }
}
