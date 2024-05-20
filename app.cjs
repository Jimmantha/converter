import { type } from 'os'

const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const path = require('path')
const fetch = require('fetch')
const app = express()
const port = 8000

const Schema = mongoose.Schema;


const ZoneSchema = new Schema({
    startX: {
        type: Number,
        required: false
    },
    startY: {
        type: Number,
        required: false
    },
    endX: {
        type: Number,
        required: false
    },
    endY: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: false
    }
})

const floorplan = new Schema({
    floorplan: {
        type: String,
        required: false
    },
    floorlevel: {
        type: Number,
        required: false
    },
    zones: [ZoneSchema]
});





const floorDetails = mongoose.model('floors', floorplan);

mongoose.connect('mongodb://localhost:27017/').then(async () => {
    console.log('connected to db')
})


app.set('views', path.join(__dirname, 'website'));
app.use(express.static(path.join(__dirname, 'website')));
app.set('view engine', 'ejs');

app.use(bodyparser.json())
var nfloorDetails

async function fetchFloorDetails() {
    try {
        const data = await floorDetails.find({});
        console.log('data', data);
    } catch (err) {
        console.error('Error:', err);
    }
}


app.get('/', async (req, res) => {
    fetchFloorDetails();
    res.render('converter', { nfloorDetails })
})
app.get('/map', (req, res) => {
    res.render('imagemapster')
})


app.get('/floorplan', (req, res) => {
    res.render('converter')
})
var FinZone = [];
app.post('/submit', async (req, res) => {
    console.log('upload read', req.body)
    const { floorplan, floorLevel, buildingName, zones } = req.body;

    for (var zone in zones) {
        var tempZone = zones[zone];
        tempZone.name = zone;
        console.log('tempZone', tempZone)
        FinZone.push(tempZone)
    }
    console.log('zone', FinZone)
    const newFloor = new floorDetails({
        zones: FinZone,
        floorplan: floorplan,
        floorlevel: floorLevel,
    })
    newFloor.save();
    res.send('Data saved successfully');
});



app.listen(port, () => {
    console.log('server running on port', port)
})

