import '../index'
import {
    AppTrackingTransparency,
    AppTrackingStatusResponse
} from 'capacitor-plugin-app-tracking-transparency'

export class AppTrackingStatusResponseLogin {
    /**
     * @returns {Promise<'authorized'(允許) | 'denied'(拒絕) | 'notDetermined'(未決定) | 'restricted'(受限)>}
     */
    static async requestPermission() {
        const response = await AppTrackingTransparency.requestPermission()
        return response
    }

    /**
     * @returns {Promise<'authorized'(允許) | 'denied'(拒絕) | 'notDetermined'(未決定) | 'restricted'(受限)>}
     */
    static async getStatus(): Promise<AppTrackingStatusResponse> {
        const response = await AppTrackingTransparency.getStatus()
        return response
    }
}
