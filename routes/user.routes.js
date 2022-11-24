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
            res.render('users/user-list', {
                users,
                isSith: req.session.currentUser.type === 'Sith'
            })
        })
        .catch(err => (err))
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
                isUser: req.session.currentUser._id === user_id
            })
        })
        .catch(err => next(err))
})


router.get("/editar/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('users/edit-character', {
            user,
            isMaster: req.session.currentUser.role === 'Master',
            isSoldier: req.session.currentUser.role === 'soldier',
            isUser: req.session.currentUser._id === user_id
        }))
        .catch(err => next(err))
})


router.post("/editar/:user_id", (req, res, next) => {

    const { user_id } = req.params
    const { username } = req.body

    User
        .findOneAndUpdate({ _id: user_id }, { username })
        .then(() => res.redirect('/usuarios/lista-usuarios'))
        .catch(err => next(err))
})

router.post("/eliminar/:user_id", (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/usuarios/lista-usuarios'))
        .catch(err => next(err))
})
router.get('/rangos/:user_id/:type', isLoggedIn, (req, res, next) => {
    const { type, user_id } = req.params


    User
        .findByIdAndUpdate(user_id, { type })
        .then(() => {
            res.redirect(`/usuarios/lista-usuarios`)
        })
        .catch(err => console.log(err))
})


module.exports = router