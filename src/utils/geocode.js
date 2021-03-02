const request = require('postman-request')

// Geocoding API (turns an address to a latitude and longitude coordinate pair)

//if anyone searches with special characters like '?' this code 'encodeURIComponent(address)' would convert it to a string that the url would understand (? becomes %3F) 
const geocode = (address, callback) => {
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaWxhbmhrIiwiYSI6ImNrbGdyZTBnazFmNjAyeHA3OXU4djFrbzgifQ.T0D-NP9eVUttO7mJuNA-Vg&limit=1'

    request({ url, json: true }, (error, {body}) => {

        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search', undefined)    
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }

    })
}

module.exports = geocode