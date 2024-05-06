const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 9000

app.set('views', path.join(__dirname, 'website'));
app.use(express.static(path.join(__dirname, 'website')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('converter')
})

app.listen(port, () => {
    console.log('server running on port', port)
})
