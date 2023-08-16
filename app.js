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

    const party_request = {
        'name': [],
        'size': req.body.size
    }
    party_request.name.push(req.body.name)

    if (parties.length !== 0) {
        parties.forEach((party) => {
            if (party.size === req.body.size) {
                console.log("Records for party: ", party)
                party.name.push(req.body.name)
            } else {
                console.log("No Entry, creating...")
                parties.push(party_request)
            }
        })
    } else {
        console.log("Empty Record, inserting a starting record.")
        parties.push(party_request)
    }

    console.log("parties", parties)

    try {
        res.send(parties)
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