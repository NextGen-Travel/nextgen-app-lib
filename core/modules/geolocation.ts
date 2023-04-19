import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'

type Position = {
    lat: number
    lng: number
}

type GeoLocationPermission = {
    pass: boolean
    failType: 'not_enabled_gps' | 'no_permission' | 'none' | 'unknown'
}

export class GeoLocationManager {
    static requestPermissions(): Promise<GeoLocationPermission> {
        return new Promise((resolve) => {
            let IsApp = Capacitor.isNativePlatform()
            if (IsApp) {
                Geolocation.checkPermissions().then(result => {
                    if (result.location === 'denied') {
                        resolve({
                            pass: false,
                            failType: 'no_permission'
                        })
                    } else {
                        resolve({
                            pass: true,
                            failType: 'none'
                        })
                    }
                })
            } else if (navigator.geolocation) {
                let onSuccess = () => resolve({
                    pass: true,
                    failType: 'none'
                })
                let onError = (error: any) => resolve({
                    pass: false,
                    failType: error.code === 1 ? 'no_permission' : 'not_enabled_gps'
                })
                navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                })
            } else {
                resolve({
                    pass: false,
                    failType: 'unknown'
                })
            }
        })
    }

    static async getCurrentPosition(def?: Position): Promise<Position> {
        let pass = (await GeoLocationManager.requestPermissions()).pass
        if (pass) {
            let IsApp = Capacitor.isNativePlatform()
            if (IsApp) {
                let position = await Geolocation.getCurrentPosition()
                return {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }
            if (navigator.geolocation) {
                let position: GeolocationPosition = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject,
                        {
                            maximumAge: 3000,
                            timeout: 5000,
                            enableHighAccuracy: true
                        }
                    )
                })
                return {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }
        }
        return def || {
            lat: 0,
            lng: 0
        }
    }

    /**
     * @param unit K = 英里 N = 公里
     */

    static distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'N' | 'K' = 'K') {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0
        } else {
            let radlat1 = Math.PI * lat1 / 180
            let radlat2 = Math.PI * lat2 / 180
            let theta = lon1 - lon2
            let radtheta = Math.PI * theta / 180
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 60 * 1.1515
            if (unit === 'K') {
                dist = dist * 1.609344
            }
            if (unit === 'N') {
                dist = dist * 0.8684
            }
            return dist
        }
    }
}
