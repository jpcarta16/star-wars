const express = require('express');

const { isLoggedIn } = require('../middleware/route');

const Post = require('../models/Post.model');

const router = express.Router();


router.get("/crear", isLoggedIn, (req, res, next) => {
    res.render("comment/new-comment")
});

router.post("/crear", isLoggedIn, (req, res, next) => {

    const { title, post } = req.body
    const { _id: comments } = req.session.currentUser

    Comment
        .create([owner, title, comment])
        .then(() => {
            res.redirect('/post')
        })
        .catch(err => console.log(err))
});


module.exports = router