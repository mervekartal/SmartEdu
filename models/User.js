const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
})

UserSchema.pre('save', function(next){
    const user = this
    //10 -> salt param
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })

})

const User = mongoose.model('User',UserSchema)
module.exports = User



