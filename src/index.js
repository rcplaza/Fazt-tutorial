const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const methosOverride = require('method-override')
const session = require('express-session')

// Initialization
const app = express()
require('./db')

// Settingsds
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partial'),
}))
app.set('view engine', '.hbs')

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(methosOverride())
app.use(session({
    secret: 'my-secret-word',
    resave: true,
    saveUninitialized: true
}))

// Global Variables

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