const request = require('request')

const forecast = (latitude, logitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e10ab777ae5491eee897373ba144920&query=' + latitude + ',' + logitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the Weather services', undefined)
        } else if (error) {
            callback('Unable to find the the location. Please try again.', undefined)
        } else {
            const data = response.body.current
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degree.')
        }
    })
}

module.exports = forecast