const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter a name']
    },
    email:{
        type:String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Duplicate'],
        lowercarse:true,
        validate: [isEmail, 'Please enter a valida email adress']
    },
    password:{
        type:String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The password should be at least 6 characters long']
    }
})

// Criptografia de senha antes de subir ao bd. 
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password)
    console.log('before save', this)
    next()
})
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if(isAuthenticated){
            return user
        }
        throw Error('incorrect pwd');
    }else{
        throw Error('incorrect Email')
    }
}

const User = mongoose.model('user', userSchema)
module.exports = User;