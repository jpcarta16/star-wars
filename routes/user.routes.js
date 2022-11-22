const express = require('express')

const router = express.Router()

const charactersApi = require('./../services/character-api-services')

const api = new charactersApi()

const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/route')


router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('users/user-list', { users })
        })
        .catch(err => (err))
})

router.get("/list", (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('users/character-list-All', { users })
        })
        .catch(err => (err))
})


router.get("/list/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/user-details', {
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
            res.render("users/user-list", { users })
        })
        .catch(err => console.error(err))
});


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

    const { id: character_id } = req.params
    const { name } = req.body

    User
        .findOne(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/users/user-list'))
        .catch(err => console.log(err))
})

module.exports = router