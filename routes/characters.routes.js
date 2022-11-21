const express = require('express')
const router = express.Router()
const ApiCharacters = require('./../services/character-api-services')
const api = new ApiCharacters()

router.get("/list/character", (req, res, next) => {


    api

        .getAllCharacters()
        .then(response => {
            res.render("usuarios/character-list-All", { characters: response.data })
            // console.log({ characters: response.data })
        })
        .catch(err => console.log(err))

})

module.exports = router