const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Define paths for express
const publicDir = path.join(__dirname, '../public');
const templateDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
const app = express()
app.set('view engine', 'hbs')
app.set('views', templateDir)
hbs.registerPartials(partialDir)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        name:"Deepesh"
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {title: "About Me", name: "Deepesh"})
})

app.get('/help', (req, res) =>{
    res.render('help', {message: "Please Help Me!!", title: "Help", name:"Deepesh"})
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({error:"Address must be provided"})
    }
    
    const loc = req.query.address

    var resp; 
    geocode(loc, (error, {latitude, longitude, location}={}) =>{

        if (error) {
          return res.send({'message': error });
        }

        forecast(latitude, longitude, (error, {description, temperature, feelslike }) => {
        
            if (error) {
                return res.send({'message': error });
            }
            return res.send({'description' : description,
                        'temperature' : temperature,
                        'feelslike' : feelslike,
                        'location' : location,
                        'address'  : req.query.address
                    })
            
        })
    })
}) 

app.get('/products', (req, res) =>{
    if (!req.query.search) {
       return res.send({error:"must provided search key"})
    }
    console.log(req.query.name);
    res.send({products:[]})
})

app.get('/help/*', (req, res) =>{
    res.render('404',{message:"Help article do not exist"})

})

app.get('*', (req, res) =>{
    res.render('404', {message:"Page for this does not exist"} )

})

app.listen(3000, () => {
    console.log('server is up on port 30000')
})