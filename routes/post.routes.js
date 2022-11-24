const express = require('express');

const { isLoggedIn } = require('../middleware/route');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model')

const router = express.Router()



router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("post/new-post")
})


router.post("/crear", isLoggedIn, (req, res, next) => {

  const { title, post, imageUrl } = req.body
  const { _id: owner } = req.session.currentUser

  Post
    .create({ owner, title, post, imageUrl })
    .then(() => {
      res.redirect('/post')
    })
    .catch(err => next(err))
})


router.get("/", isLoggedIn, (req, res, next) => {

  Post
    .find()
    .populate('owner')
    .then(post => {
      res.render('post/post', { post })
    })
    .catch(err => next(err))
})


router.get("/detalles/:post_id", (req, res, next) => {


  const { post_id } = req.params

  Post
    .findById(post_id)
    .populate('owner')
    .populate({ path: 'comments', populate: { path: 'owner' } })
    .then(post => {
      res.render("post/post-details", { post })
    })
    .catch(err => next(err))

})


module.exports = router