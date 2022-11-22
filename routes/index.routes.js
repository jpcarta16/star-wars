const express = require('express');

const { isLoggedIn } = require('../middleware/route');

const router = express.Router()


router.get("/", (req, res, next) => {

  res.render("index");

});



router.get("/mi-perfil", isLoggedIn, (req, res, next) => {

  res.render("usuarios/user-details", { user: req.session.currentUser })

})



module.exports = router;
