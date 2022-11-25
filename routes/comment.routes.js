const express = require('express');

const { isLoggedIn } = require('../middleware/route');

const Comment = require("../models/Comment.model")

const Post = require("../models/Post.model")

const router = express.Router();




router.get("/crear/:post_id", isLoggedIn, (req, res, next) => {
    const { post_id } = req.params
    res.render("comment/new-comment", { post_id })

});

router.post("/crear/:post_id", isLoggedIn, (req, res, next) => {

    const { title, description } = req.body
    const { _id: owner } = req.session.currentUser
    const { post_id } = req.params
    Comment
        .create({ owner, title, description })
        .then(newComment => {
            const commentId = newComment._id
            Post
                .findByIdAndUpdate(post_id, { $push: { comments: commentId } })
                .then(() => {
                    res.redirect(`/post/detalles/${post_id}`)
                })

        })
        .catch(err => next(err))


});

router.post('/eliminar/:id/:post_id', (req, res, next) => {

    const { id: comments_id, post_id } = req.params

    Comment
        .findByIdAndDelete(comments_id)
        .then(() => {
            return Post
                .findByIdAndUpdate(post_id, { $pull: { comments: comments_id } })

        })
        .then(() => {
            res.redirect(`/post`)
        })
        .catch(err => console.log(err))

})


module.exports = router