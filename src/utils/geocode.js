const request = require('postman-request')

const geocode = (address, callback)=>{
    const options = {
        url: 'https://api.myptv.com/geocoding/v1/locations/by-text?searchText=' + encodeURIComponent(address) + '&countryFilter=US',
        json: true,
        headers: {
            apiKey: 'YTliOTk3ZGE0Y2U1NGM0Njg2YmFkNjQ1NGI4N2M0OWE6NGFjMmFlYzctNGU4NS00ZjBlLTkyNjYtZTdjYmE1OWU0NTc5',
            contentType: 'application/json'
        }
      }

    request(options,(error, { body }) => {
        if (error) {
            callback('Currently unable to reach Geolocation service.', undefined);
        }
        else if(body.locations.length === 0){
            callback('Unable to find location. Try another search', undefined);
        }
        else{
            callback(undefined, {
                location: body.locations[0].formattedAddress,
                latitude: body.locations[0].referencePosition.latitude,
                longitude: body.locations[0].referencePosition.longitude
            })
        }
    })
}

module.exports = geocode