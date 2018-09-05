let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    created: { 
        type: Number, 
        required: true, 
        default: Date.now() 
    },
    boardId: { 
        type: ObjectId, 
        ref: 'Board', 
        required: true 
    }
})

module.exports = mongoose.model(schemaName, schema)