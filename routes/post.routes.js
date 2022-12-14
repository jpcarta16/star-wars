const express = require('express');
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn } = require('../middleware/route');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model')

const router = express.Router()



router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("post/new-post")
})


router.post("/crear", isLoggedIn, fileUploader.single('imageUrl'), (req, res, next) => {

  const { title, post } = req.body
  const { _id: owner } = req.session.currentUser
  console.log(req.session)
  console.log({ title, post })
  Post
    // .create({ owner, title, post, imageUrl: req.file.path })
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
    .findByIdAndUpdate(post_id)
    .populate('owner')
    .populate({ path: 'comments', populate: { path: 'owner' } })
    .then(post => {
      res.render("post/post-details", {
        post,
        isMaster: req.session.currentUser.role === 'Master',
        isSoldier: req.session.currentUser.role === 'soldier',
        isUser: req.session.currentUser._id === post.owner.toString()

      })
    })
    .catch(err => next(err))

})

router.get("/editar/:post_id")


router.post('/eliminar/:post_id', (req, res, next) => {

  const { post_id } = req.params

  Post
    .findByIdAndDelete(post_id)
    .then(() => res.redirect('/post'))
    .catch(err => console.log(err))

})

module.exports = router