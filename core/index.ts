import { i18n } from './i18n'

window.__ng_app_state = {} as any
window.__ng_app_config = {
    libOptions: {
        lang: 'en-US',
    },
    libEnv: {
        version: 1,
        stage: '',
        service: ''
    }
}

export const useLibOptions = () => window.__ng_app_config.libOptions
export const useLibEnv = () => window.__ng_app_config.libEnv
export const t = (key: string, params = {}) => i18n.key(key as any, params).get(window.__ng_app_config.libOptions.lang)

export const NextgenAppLib = {
    install(params: {
        options: typeof window.__ng_app_config.libOptions
        env: {
            stage: string
            service: string
        }
    }) {
        for (let key in params.options) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.__ng_app_config.libOptions[key] = params.options[key]
        }
        for (let key in params.env) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.__ng_app_config.libEnv[key] = params.env[key]
        }
    }
}

export default NextgenAppLib
