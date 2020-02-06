const router = require('express').Router()
const moment = require('moment')
const NOTE = require('../models/note.model')

const { isAuthenticated } = require('../helpers/auth')

moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";

router.get('/notes/add', isAuthenticated,  (req, res)=> {
    res.render('notes/new-note');
})

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await NOTE.findById(req.params.id)
    res.render('notes/edit-note', { note })
})

router.get('/notes', isAuthenticated, async (req, res)=> {
    const notes = await NOTE.find({createdBy: req.user.id}).sort({updatedAt: 'desc'})
    res.render('notes/all-notes', { notes })
})

router.post('/notes/new-note', isAuthenticated,  async (req, res)=> {
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
            updatedAt:  moment(new Date(Date.now()), moment.defaultFormat).toDate(),
            createdBy:  req.user.id
        })

        await newNote.save()
        req.flash('success_msg', 'Note added successfully')
        res.redirect('/notes')
    }
})
router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description} = req.body
    const updatedAt =  moment(new Date(Date.now()), moment.defaultFormat).toDate()
    
    await NOTE.findByIdAndUpdate(req.params.id, {title, description, updatedAt})
    req.flash('success_msg', 'Note updated successfully')
    res.render('/notes')
})

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await NOTE.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
})

module.exports = router