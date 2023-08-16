const datefns = require('date-fns')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router()

let parties = []
const port = 8080

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({'greeting': 'Hello World!'})
})

app.get('/healthcheck', (req, res) => {
    res.json({"heartbeat": true})
})

app.post('/reserve', async(req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    console.log("req", req.body)
    console.log("name", req.body.name)
    console.log("size", req.body.size)

    const party_request = {
        'name': req.body.name,
        'size': req.body.size
    }

    parties.push(party_request);

    try {
        party.save()
        res.send(req)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/reserve", async (req, res) => {
    console.log("Parties", parties)

    try {
        res.send(parties)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.listen(port, function () {
    console.log('App listening on port ' + port + '!')
})