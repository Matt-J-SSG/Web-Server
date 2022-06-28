
const path = require("path")
const express = require("express")
const axios = require("axios");


const app = express()

app.get('/', function (req, res) {
    res.sendFile(path.resolve("Pages/index.html"))
})

app.get('/bbc', function (req, res) {
    res.sendFile(path.resolve("Pages/bbchome.html"))
})

app.get('/test', function (req, res) {
    res.send('Hello Test')
})

app.get('/api', async function (req, res) {
    const LocURL = `https://geocoding-api.open-meteo.com/v1/search?name=${req.query.city}&count=1`
    console.log(LocURL);
    const LocResp = await axios.get(LocURL)
    const LocData = LocResp.data.results[0]


    const WeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${LocData.latitude}&longitude=${LocData.longitude}&hourly=temperature_2m`

    const response = await axios.get(WeatherURL)

    const data = response.data.hourly.temperature_2m
    const last = data[data.length - 1].toString()
    console.log(last)
    res.send(last)
})

// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1

app.listen(3000)
