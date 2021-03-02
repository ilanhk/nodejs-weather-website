const path = require('path') //node js core module
const express = require('express')
//express is a function not an object
const hbs = require('hbs') //to create 'partials' (headers and footers)
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defined Paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public') //provides the path to the public folder which has the html files. Use '..' to move out of that directory like 'cd ..'
const viewsPath = path.join(__dirname, '../templates/views') //need to create this to access the templates in the template forlder in express that folder is usually called 'views'. This way you can name the template folder any name you want.
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars(hbs) and views location
app.set('view engine','hbs') //set allows you to give a value for an express setting you want. 'hbs' is an npm library for handle bars to create dynamic templates(similar to jninja on django)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //for setting up partials (headers and footers)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//got to set up a route for the hbs file
app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather App',
        name: 'Ilan Lieberman'
    }) //allows us to render a view we want to use. first argument is the view we want to render the other is an object
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About Page',
        name: 'Ilan Lieberman'
    })
})

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help Page',
        helptext: 'Google it! wise guy :p',
        name: 'Ilan Lieberman'
    })
})

app.get('/weather', (req, res) => { 
    if (!req.query.search) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
    
        if (error){
            return res.send({error})
    
        } else {
            // console.log('Data', data)
            forecast(latitude, longitude, (error, forcast_data) => {
                if (error) {
                    return res.send({error})
                } 
                res.send({
                    forecast: forcast_data,
                    location,
                    address: req.query.search
                })
              })
        }
    })
    
})


app.get('/help/*', (req, res) => { 
    res.render('404page',{
        title: 'Help 404 Page',
        error: 'help article not found',
        name: 'Ilan Lieberman'
    })
})

//is is for 404 errors this musy be the last of the routes. The '*' means any url that we dont have
app.get('*', (req, res) => { 
    res.render('404page',{
        title: '404 Page',
        error: 'Page Doesnt Exist',
        name: 'Ilan Lieberman'
    })
})



//to start/run the server you need to use this method:
//it listens on a port argument and a callback function
// use nodemon to run the server so you can make changes better
app.listen(3000, () =>{
    console.log('Server is up on port 3000')
}) 
