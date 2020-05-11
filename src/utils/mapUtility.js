function getGeoCoder(mapboxgl) {
    return new window.MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
}

function getGeoLocateControl(mapboxgl) {
    return new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
}

export const mapUtility = { getGeoCoder, getGeoLocateControl }