const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/node-app', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( db => console.log('database is connected'))
.catch( error => console.log(error))
