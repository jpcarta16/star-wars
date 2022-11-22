function isLoggedIn(req, res, next) {

    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Log in to access' })
    }
}


function isLoggedOut(req, res, next) {

    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}


const checkRoles = (...rolesToCheck) => (req, res, next) => {

    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('/auth/login', { errorMessage: `No tienes permisos de ${rolesToCheck}` })
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
}