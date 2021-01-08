const request = require('request')

// MapBox API
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoiYW1hcm1hbmRhbCIsImEiOiJja2ppd2Foa2Yzcno2MnFydXFkc3hseDliIn0.tmD7pUl5ORueKAxLRGNaog'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to MapBox services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Please try again!', undefined)
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode