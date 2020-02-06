const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    let errors = []

    if(req.isAuthenticated()) {
        return next()
    }else {
         errors.push({ message: 'Not authotized' })
         res.redirect('/users/signin')
    }
}

module.exports = helpers