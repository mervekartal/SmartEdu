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
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

// UserSchema.pre('save', function(next){
//     const user = this
//     //10 -> salt param
//     bcrypt.hash(user.password, 10, (error, hash) => {
//         user.password = hash
//         next()
//     })

// })

//user nesnesindeki değerlerde değişiklik olduğunda mongoose password'ü modifiye ettiği için password şifreleme alanında kod değişikliği yapıldı
UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next() //kullanıcı pwd modifiye edilmediyse next yap

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

const User = mongoose.model('User',UserSchema)
module.exports = User



