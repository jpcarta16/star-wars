const express = require('express')

const router = express.Router()

const ApiCharacters = require('./../services/character-api-services')

const api = new ApiCharacters()



router.get("/lista-personajes", (req, res, next) => {

    api
        .getAllCharacters()
        .then(response => {
            res.render("users/character-list-All", { characters: response.data })
        })
        .catch(err => console.log(err))
})


router.get("/lista/detalles/:character_id", (req, res, next) => {

    const { character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => {
            res.render("users/character-details", { characters: response.data })
        })
        .catch(err => console.log(err))
})

module.exports = router