const express = require('express')
const app = express()
const path=require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 

const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('' , (req,res)=>{
    res.render('index', {
        title : 'Weather App',
        name:'Suyash Jhawer'
    })
})

app.get('/help' , (req , res)=>{
    res.render('help' ,{
        title : 'Help',
        name:'Suyash Jhawer' ,
        message:'this link provides you help options xD'
    })
})

app.get('/about' , (req , res)=>{
    res.render('about',{
        title : 'Weather App',
        name:'Suyash Jhawer'
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send(
             {
                 error:'No address given'
             }
         )
        }
        geocode(req.query.address , (error, {latitude , longitude , location} = {}) => {

            if(error)
            {
                return res.send({error})
            }
    
         
         forecast(latitude, longitude , (error, forecastdata) => {
            if(error)
            {
                return res.send(error) 
            }
            res.send({
                location:location ,
                forecastdata:forecastdata
            })
           
            
        })
     })
     
     
})

app.get('/products',(req , res)=>{
    if(!req.query.search){
       return res.send(
            {
                error:'No search given'
            }
        )
    }
    console.log(req.query)
    res.send(
        {
            products:[]
        }
    )
})
app.get('/help/*' , (req , res)=>{
    res.render('404' ,
    {errormessage:'help error'}
)
})

app.get('*' , (req , res)=>{
    res.render('404' ,
        {errormessage:'generic error'}
    )
})

app.listen(3000 , ()=>{
    console.log('Server is up on port 3000.')
})