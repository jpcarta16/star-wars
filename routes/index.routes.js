const express = require('express');
const { isLoggedIn } = require('../middleware/route');
const router = express.Router()
// const characterRoute =require("./../services")



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




// router.get("./api.routes" ,(req, res)=> {
//   res.render("usuarios/character-list-All")
// })

// router.get("/personajes", charactersRouter)



router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
  res.render("usuarios/user-details", { user: req.session.currentUser })
})



module.exports = router;
