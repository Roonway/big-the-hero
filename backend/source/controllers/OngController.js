const crypto = require('crypto');
const connect = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connect('ongs').select('*');
        
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, fone, city, uf} = request.body;
  
        const id = crypto.randomBytes(4).toString('HEX');
    
        // await faz o node aguardar o termino da execução da função
        await connect('ongs').insert({
            id,
            name,
            email,
            fone,
            city,
            uf,
        });
    
        return response.json({id});
    }
}