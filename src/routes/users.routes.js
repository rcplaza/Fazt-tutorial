const router = require('express').Router()
const moment = require('moment')
const passport = require('passport')
const USER = require('../models/user.model')

moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";


router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.post('/users/signup', async (req, res) => {
    let errors = []
    const { name, email, password, confirm_password } = req.body

    if (name.trim().length <= 0) {
        errors.push({ message: 'Name can\'t be empty' })
    }

    if (email.trim().length <= 0) {
        errors.push({ message: 'Email can\'t be empty' })
    }

    if (password.trim().length <= 0) {
        errors.push({ message: 'Password can\'t be empty' })
    }

    if (password.trim().length > 0 && password.trim().length <= 5) {
        errors.push({ message: 'The minimum password length must be 6 characters' })
    }

    if (confirm_password.trim().length <= 0) {
        errors.push({ message: 'You must confirm the password' })
    }

    if (password.trim() != confirm_password.trim()) {
        errors.push({ message: 'Password does not match' })
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email })
    } else {
        const newUser = new USER({
            name,
            email,
            password,
            createdAt: moment(new Date(Date.now()), moment.defaultFormat).toDate(),
            updatedAt: moment(new Date(Date.now()), moment.defaultFormat).toDate()
        })

        const notUnique = await USER.findOne({ email: email })

        if (notUnique) {
            errors.push({ message: 'This email is alredy register' })
            res.render('users/signup', { errors, name })
        }else {
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'You are registered successfully')
            res.render('users/signin')
        }
        
    }
})

router.get('/users/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
module.exports = router