const User = require('../models/User')
const jwt = require('jsonwebtoken')
const maxAge = 5 * 24 * 60 * 60
const createJWT = id => {
    return jwt.sign({ id }, 'chatroom secret', {
        expiresIn: maxAge
    })
}

const alertError = (err) => {
    let errors = { name: '', email: '', password: '' }

    if (err.message == 'incorrect email') {
        errors.email = 'This email not found';
    }
    if (err.message == 'incorrect pwd') {
        errors.pwd = 'Password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'This email alredy registred'
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.erros).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = User.create({ name, email, password })
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnli: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });

    } catch (err) {
        let errors = alertError(err)
        res.status(400).json({ errors })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = User.login(email, password)
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnli: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });

    } catch (err) {
        let errors = alertError(err)
        res.status(400).json({ errors })
    }
}

module.exports.verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'chatroom secret', async(err, decodeToken) => {
            if(err){
                console.log(err.message)
            } else{
                let user = await User.findById(decodeToken.id)
                res.json(user);
                next();
            }
        })
    } else{
        next();
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '',{maxAge:1})
    res.status(200).json({logout: true})
}