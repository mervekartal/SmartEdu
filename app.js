const express = require('express')
const ejs = require('ejs')
const pageRoute = require('./routes/pageRoute')

const app = express()

//template engine
app.set("view engine","ejs")

//middlewares
app.use(express.static("public"))

//routes
app.use('/', pageRoute) //aynı kullanım -> app.get('/', pageRoute) 
app.use('/about', pageRoute)

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})