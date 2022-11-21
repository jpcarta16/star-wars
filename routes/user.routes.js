const express = require('express')
const router = express.Router()
const charactersApi = require('./../services/character-api-services')
const api = new charactersApi()

const User = require('./../models/User.model')
const { isLoggedOut } = require('./../middleware/route')
const { isLoggedIn } = require('./../middleware/route')
const bcryptjs = require('bcryptjs');
const { application } = require('express');

const saltRounds = 10

router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('usuarios/user-list', { users })
        })
        .catch(err => (err))
})

router.get("/list", (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('usuarios/character-list-All', { users })
        })
        .catch(err => (err))
})


router.get("/users/list/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('usuarios/user-details', {
                user,
                isMaster: req.session.currentUser.role === 'Master',
                isSolder: req.session.currentUser.role === 'solder',
            })
        })
        .catch(err => (err))
})

router.get("/list", (req, res) => {

    api
        .getAllCharacters()
        .then(users => {
            res.render("usuarios/user-list", { users })
        })
        .catch(err => console.error(err))
});

// Edit character form (render)
router.get("/editar/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(character => res.render('usuarios/edit-character', {
            character,
            isMaster: req.session.currentUser.role === 'Master',
            isSolder: req.session.currentUser.role === 'solder',
        }))
        .catch(err => console.log(err))
})


// Edit character form (handle)
router.post("/editar/:id", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, type, role } = req.body

    User
        .findOne(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/usuarios/user-list'))
        .catch(err => console.log(err))
})
module.exports = router