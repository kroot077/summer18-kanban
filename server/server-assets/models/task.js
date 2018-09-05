let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: { 
        type: Number, 
        required: true, 
        default: Date.now() 
    },
    listId: { 
        type: ObjectId, 
        ref: 'List', 
        required: true 
    }
})

module.exports = mongoose.model(schemaName, schema)