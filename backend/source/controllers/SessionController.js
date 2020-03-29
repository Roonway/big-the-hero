const connect = require('../database/connection');

module.exports = {
    async login(request, response) {
        const { id } = request.body;
        
        const ong = await connect('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            console.error('Erro 400: No ONG  with this ID');

            return response.status(400).json({ error: 'No ONG  with this ID'})
        }

        return response.json(ong);
    }
}