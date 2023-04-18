import { Event } from 'power-helper'

/* eslint-disable @typescript-eslint/no-empty-interface */

declare global {
    interface Window {
        __ng_app_state: {
            app: {
                launchUrl: string
                globEvent: Event
            }
        }
        __ng_app_config: {
            libOptions: {
                lang: 'en-US' | 'zh-TW' | 'zh-CN'
            },
            libEnv: {
                version: number
                stage: string
                service: string
            }
        }
    }
}

export {}
