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
        return this.axiosApp.get(`/id/${characterId}.json`)
    }
}

module.exports = ApiCharacters

