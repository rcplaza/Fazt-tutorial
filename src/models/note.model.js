const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'this is a required field']
    },
    description: {
        type: String,
        required: [true, 'this is a required field']
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    createdBy: {
        type: String,
        required: [true, 'this is a required field']
    }
})

module.exports = mongoose.model('Note', noteSchema)