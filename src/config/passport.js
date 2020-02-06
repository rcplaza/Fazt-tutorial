const passport = require('passport')
const localStrategy = require('passport-local')

const USER = require('../models/user.model')

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const userExist = await USER.findOne({ email: email })

    if(!userExist) {
        return done(null, false, { message: 'User not found'})
    }else {
        const match = await userExist.matchPassword(password)
        if (!match) {
            return done(null, userExist, { message: 'Incorrect Password'})
        }else {
            return done(null, userExist)
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const user = await USER.findById(id)
    if (!user){
        return done(err, false)
    }else {
        return done(null, user)
    }
}) 