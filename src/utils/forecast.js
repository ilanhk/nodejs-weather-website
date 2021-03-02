const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6e3fdfade1d22b33e11117d37d25748b&query='+latitude+','+ longitude+'&units=m'

    request({ url, json: true }, (error, {body}) => {

        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try another search', undefined)    
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature +'°C outside with '+ body.current.humidity+ '% humidity and '+ body.current.precip + '% chance of rain.')
        }

    })
}

module.exports = forecast