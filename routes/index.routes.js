const express = require('express');
const { isLoggedIn } = require('../middleware/route');
const router = express.Router()
// const characterRoute =require("./../services")



/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.app.locals.username)
  res.render("index");
});




// router.get("./api.routes" ,(req, res)=> {
//   res.render("usuarios/character-list-All")
// })

// router.get("/personajes", charactersRouter)



router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
  res.render("usuarios/user-details", { user: req.session.currentUser })
})
router.get("/post/create", isLoggedIn, (req, res, next) => {
  res.render("new-post")
})
router.post("/post/create", isLoggedIn, (req, res, next) => {
  const { owner, title, post } = req.body

  Celebrity
    .create({ owner, title, post })
    .then(() => {
      res.redirect('/post')
    })
    .catch(err => console.log(err))
})
router.get("/post", isLoggedIn, (req, res, next) => {
  res.render("post");
})




module.exports = router;
