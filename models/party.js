var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PartySchema = new Schema(
    {
        party_name: { type: String, required: false },
        size: { type: Number, required: true }
    }
)

module.exports = mongoose.model('Party', PartySchema)