const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=89d563857bf5434f0164a4a056915c56&query='+ lat + ',' + long
    
    request({url, json:true},(error,{body}) => {

              //low level error
              if (error) {
                callback('Cannot reach weatherstack services', undefined)
            }
            else if (body.success === false){ 
                callback(body.error.code + " " + body.error.info, undefined)
            }
            else {
                callback(undefined, 
                    {
                        description: body.current.weather_descriptions[0],
                        temperature: body.current.temperature,
                        feelslike: body.current.feelslike
                    }
                )
            }
  
    })

}



module.exports = forecast;