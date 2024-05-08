const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
const port = 8000

app.set('views', path.join(__dirname, 'website'));
app.use(express.static(path.join(__dirname, 'website')));
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.get('/', (req, res) => {
    res.render('converter')
})

app.get('/floorplan', (req, res) => {
    res.render('Floorplan')
})

app.post('/submit', (req, res) => {
    console.log('upload read', req.body)
})

app.listen(port, () => {
    console.log('server running on port', port)
})

