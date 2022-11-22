const express = require('express');
const { isLoggedIn } = require('../middleware/route');
const Post = require('../models/Post.model');
const router = express.Router()

router.get("/post/create", isLoggedIn, (req, res, next) => {
  res.render("new-post")
})
router.post("/post/create", isLoggedIn, (req, res, next) => {
  const { owner, title, post } = req.body
  const { user_id } = re.params

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
