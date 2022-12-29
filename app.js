const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')


const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()


//connect db
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:2717/smartedu-db').then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})

process.on('warning', (warning) => {
    console.log(warning.stack);
})


//template engine
app.set("view engine","ejs")

//middlewares
app.use(express.static("public"))

//routes
app.use('/', pageRoute) //aynı kullanım -> app.get('/', pageRoute) 
app.use('/courses', courseRoute)

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})