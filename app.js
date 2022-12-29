const express = require('express')
const { render } = require('express/lib/response')

const app = express()

app.get('/', (req,res) => {
    res.status(200).send('index sayfasi')
})
const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})