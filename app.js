const datefns = require('date-fns')
const express = require('express')
const cors = require('cors')
const router = express.Router()
const database = require('./database')
const Party = require('./models/party')

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

    const party = new Party(req.body)

    try {
        party.save()
        res.send(party)
    } catch (error) {
        res.status(500).send(error)
    }
})