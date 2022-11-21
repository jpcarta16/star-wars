const axios = require('axios');

class ApiCharacters {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://akabab.github.io/starwars-api/api'
        })
    }

    getAllCharacters = () => {
        return this.axiosApp.get('/all.json')
    }

    getOneCharacter = (characterId) => {
        return this.axiosApp.get(`/all.json/${Id}`)
    }

    createCharacter = (characterInfo) => {
        return this.axiosApp.post(`/all.json`, characterInfo)
    }

    editCharacter = (characterId, characterInfo) => {
        return this.axiosApp.put(`/all.json/${characterId}`, characterInfo)
    }

    deleteCharacter = (characterId) => {
        return this.axiosApp.delete(`/all.json/${characterId}`)
    }
}

module.exports = ApiCharacters

