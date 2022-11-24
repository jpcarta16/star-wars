const express = require('express')

const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedOut } = require('./../middleware/route')

const bcryptjs = require('bcryptjs');

const saltRounds = 10


router.get('/crear', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
})


router.post('/crear', isLoggedOut, (req, res, next) => {

    const { username, password, type } = req.body

    // const type = Sith ? "Sith" : "Jedi"

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt)
        })
        .then(hashedPassword => {
            return User.create({ type, username, password: hashedPassword })
        })
        .then(() => res.redirect('/iniciar-sesion'))
        .catch(err => next(err))
})


router.get('/iniciar-sesion', isLoggedOut, (req, res,) => { res.render('auth/login') })


router.post('/iniciar-sesion', isLoggedOut, (req, res, next) => {
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
            req.session.currentUser = user

            res.redirect('/')
        })
        .catch(err => next(err))
})


router.get('/cerrar-sesion', (req, res) => {

    req.session.destroy(() => {

        res.redirect('/')
    })
})


module.exports = router