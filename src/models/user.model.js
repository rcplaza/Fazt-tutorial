const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'this is a required field']
    },
    email: {
        type: String,
        required: [true, 'this is a required field'],
        unique: [true, 'This field is unique']
    },
    password: {
        type: String,
        required: [true, 'this is a required field']
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
})

userSchema.methods.encryptPassword = async password => {
    const salt= await bcrypt.genSalt(10)
    const hash= bcrypt.hash(password, salt)
    return hash
}


userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)