const express = require('express')

const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/route')



router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
    res.render("usuarios/user-details", { user: req.session.currentUser })
})


router.get("/lista-usuarios", isLoggedIn, (req, res, next) => {
    User
        .find({ type: req.session.currentUser.type })
        .then(users => {
            res.render('users/user-list', { users })
        })
        .catch(err => (err))
})


router.get("/lista-usuarios", (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('users/character-list-All', { users })
        })
        .catch(err => console.log(err))
})


router.get("/lista-usuarios/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/user-details', {
                user,
                isMaster: req.session.currentUser.role === 'Master',
                isSoldier: req.session.currentUser.role === 'soldier',
            })
        })
        .catch(err => console.log(err))
})


router.get("/editar/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(character => res.render('users/edit-character', {
            character,
            isMaster: req.session.currentUser.role === 'Master',
            isSoldier: req.session.currentUser.role === 'soldier',
        }))
        .catch(err => console.log(err))
})


router.post("/editar/:id", (req, res, next) => {

    const { id: user_id } = req.params
    const { name } = req.body

    User
        .findOne(user_id, { name, type })
        .then(() => res.redirect('/users/user-list'))
        .catch(err => console.log(err))
})


module.exports = router