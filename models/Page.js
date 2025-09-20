const { url } = require('inspector')
const mongoose = require('mongoose')
const { type } = require('os')

const PageSchema = new mongoose.Schema({
    url: { type: String, unique: true, required: true },
    html: { type: String },
    linksOut: [{ type: String }], 
    linksIn: [{ type: String }],
})

module.exports  = mongoose.model('Pages', PageSchema)