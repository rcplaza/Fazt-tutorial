const router = require('express').Router()

const urlBase = '/user'
router.get(`${urlBase}/signin`, (req, res)=> {
    res.render('users/signin')
})

router.get(`${urlBase}/signup`, (req, res)=> {
    res.render('users/signup')
})

module.exports = router