const express = require('express')
const router = express.Router()
const charactersApi = require('./../services/character-api-services')
const api = new charactersApi()

const User = require('./../models/User.model')
const { isLoggedOut } = require('./../middleware/route')

const bcryptjs = require('bcryptjs');
const { application } = require('express');

const saltRounds = 10

// router.get("/list", (req, res, next) => {
//     User
//         .find()
//         .then(users => {
//             res.render('usuarios/user-list', { users })
//         })
//         .catch(err => (err))
// })

// router.get("/list", (req, res, next) => {
//     User
//         .find()
//         .then(users => {
//             res.render('usuarios/character-list-All', { users })
//         })
//         .catch(err => (err))
// })


// router.get("/users/list/:user_id", (req, res, next) => {

//     const { user_id } = req.params

//     User
//         .findById(user_id)
//         .then(users => {
//             res.render('usuarios/user-details', users)
//         })
//         .catch(err => (err))
// })

// router.get("/list", (req, res, next) => {

//     api
//         .getAllCharacters()
//         .then(responseFromAPI => {
//             res.render("usuarios/user-list", { characters: responseFromAPI.data })
//         })
//         .catch(err => console.error(err))
// });


router.get('/crear', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})
router.post('/crear', isLoggedOut, (req, res) => {

    const { username, password, type } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt)
        })
        .then(hashedPassword => {
            return User.create({ type, username, password: hashedPassword })
        })
        .then(() => res.redirect('/iniciar-sesion'))
        .catch(err => console.log(err))
})
router.get('/iniciar-sesion', isLoggedOut, (req, res) => { res.render('auth/login') })
router.post('/iniciar-sesion', isLoggedOut, (req, res) => {
    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            }

            if (bcryptjs.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'An error ocurred' })
                return
            }
            req.session.currentUser = user //lg

            req.app.locals.username = user.username
            res.redirect('/')
        })
        .catch(err => console.log(err))
})
router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy(() => {
        req.app.locals.username = null
        res.redirect('/')
    })
})



module.exports = router