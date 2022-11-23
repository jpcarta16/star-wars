const express = require('express')

const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedOut } = require('./../middleware/route')

const bcryptjs = require('bcryptjs');

const saltRounds = 10


router.get('/crear', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})


router.post('/crear', isLoggedOut, (req, res) => {
    console.log(req.body)
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
            req.session.currentUser = user

            req.app.locals.username = user.username

            req.app.locals.type = user.type

            res.redirect('/')
        })
        .catch(err => console.log(err))
})


router.get('/cerrar-sesion', (req, res) => {

    req.session.destroy(() => {

        req.app.locals.username = null

        req.app.locals.type = null

        res.redirect('/')
    })
})


module.exports = router