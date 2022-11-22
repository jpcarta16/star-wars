const express = require('express');

const { isLoggedIn } = require('../middleware/route');

const Post = require('../models/Post.model');

const router = express.Router()



router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("post/new-post")
})


router.post("/create", isLoggedIn, (req, res, next) => {

  const { title, post } = req.body
  const owner = req.session.currentUser._id

  Post
    .create({ owner, title, post })
    .then(() => {
      res.redirect('/post')
    })
    .catch(err => console.log(err))
})


router.get("/", isLoggedIn, (req, res, next) => {

  const owner = req.session.currentUser._id

  Post
    .find()
    .populate('owner')
    .then(post => res.render('post/post', { post }))
    .catch(err => console.log(err))
})


router.get("/details/:post_id", (req, res, next) => {

  const { post_id } = req.params
  const owner = req.session.currentUser._id

  Post
    .findById(post_id)
    .populate('owner')
    .then(post => {
      res.render("post/post-details", { post })
    })
    .catch(err => console.log(err))
})


module.exports = router