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
        .then(users => {
            res.render('usuarios/user-details', users)
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


module.exports = router