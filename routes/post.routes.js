const express = require('express');
const { isLoggedIn } = require('../middleware/route');
const Post = require('../models/Post.model');
const router = express.Router()

router.post("/post/create", isLoggedIn, (req, res, next) => {
  const { owner, title, post } = req.body


  Post
    .create({ owner, title, post })
    .then(() => {
      res.redirect('/post')
    })
    .catch(err => console.log(err))
})
router.get("/post", isLoggedIn, (req, res, next) => {

  Post
    .find()
    .then(post => res.render('post', { post }))
    .catch(err => console.log(err))
})




module.exports = router;
