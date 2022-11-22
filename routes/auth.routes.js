const express = require('express')

const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedOut } = require('./../middleware/route')

const bcryptjs = require('bcryptjs');

const { on } = require('connect-mongo')

const saltRounds = 10


router.get('/crear', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

router.post('/crear', isLoggedOut, (req, res) => {

    const { username, password, Jedi, Sith } = req.body
    console.log({ Jedi, Sith })
    let type
    if (Sith) {
        type = "Sith"
    } else {
        type = "Jedi"
    }

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