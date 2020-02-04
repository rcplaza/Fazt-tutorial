const router = require('express').Router()
const moment = require('moment')
const NOTE = require('../models/note.model')

moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";


router.get('/notes/add', (req, res)=> {
    res.render('notes/new-note');
})

router.post('/notes/new-note', async (req, res)=> {
    let errors = []
    const { title, description } = req.body

    if(!title) errors.push({ message: "Please write a title"})

    if(!description) errors.push({ message: "Please write a description"})

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    }else {
        let newNote = new NOTE({
            title,
            description,
            createdAt:  moment(new Date(Date.now()), moment.defaultFormat).toDate(),
            updatedAt:  moment(new Date(Date.now()), moment.defaultFormat).toDate()
        })

        await newNote.save()

        res.redirect('/notes')
    }
})


router.get('/notes', async (req, res)=> {
    const notes = await NOTE.find()
    res.render('notes/all-notes', { notes })
})

module.exports = router