const express = require('express');
const { isLoggedIn } = require('../middleware/route');
const Post = require('../models/Post.model');
const router = express.Router()


router.get("/", (req, res, next) => {
  res.render("index");
});


// router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
//   res.render("usuarios/user-details", { user: req.session.currentUser })
// })
router.get("/post/create", isLoggedIn, (req, res, next) => {
  res.render("new-post")
})
router.post("/post/create/:user_id", isLoggedIn, (req, res, next) => {
  const { owner, title, post } = req.body

  Post
    .create({ owner, title, post })
    .populate('owner')
    .then(() => {
      res.redirect('/post')
    })
    .catch(err => console.log(err))
})
router.get("/post", isLoggedIn, (req, res, next) => {

  Post
    .findOne()
    .then(post => res.render('post', { post }))
    .catch(err => console.log(err))
})

module.exports = router;
