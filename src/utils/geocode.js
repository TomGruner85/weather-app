const request = require('postman-request')

const geocode = (address)=>{
    return new Promise((resolve, reject) => {
        const options = {
            url: 'https://api.myptv.com/geocoding/v1/locations/by-text?searchText=' + encodeURIComponent(address) + '&countryFilter=US',
            json: true,
            headers: {
                apiKey: 'YTliOTk3ZGE0Y2U1NGM0Njg2YmFkNjQ1NGI4N2M0OWE6NGFjMmFlYzctNGU4NS00ZjBlLTkyNjYtZTdjYmE1OWU0NTc5',
                contentType: 'application/json'
            }
          }

          request(options,(error, { body } = {}) => {
            if (error) {
                reject('Currently unable to reach Geolocation service.');
            }
            else if(body.locations.length === 0){
                reject('Unable to find location. Try another search');
            }
            else{
                resolve({
                    location: body.locations[0].formattedAddress,
                    latitude: body.locations[0].referencePosition.latitude,
                    longitude: body.locations[0].referencePosition.longitude
                })
            }
        })
    })
}

module.exports = geocode