const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const methosOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// Initialization
const app = express()
require('./db')
require('./config/passport')

// Settingsds
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: [path.join(app.get('views'), 'partials')],
}))
app.set('view engine', '.hbs')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(methosOverride("_method"))
app.use(session({
    secret: 'my-secret-word',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user || null
    next()
})

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Server Init
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})