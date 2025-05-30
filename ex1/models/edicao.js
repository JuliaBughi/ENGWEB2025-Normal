const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EdicaoSchema = new Schema({
    _id: { type: String, required: true },
    anoEdição: { type: String, required: true },
    organizacao: { type: String, required: true },
    vencedor: { type: String },

    musicas: [
        {
            id: { type: String, required: true },
            link: { type: String, required: true },
            título: { type: String, required: true },
            país: { type: String, required: true },
            compositor: { type: String, required: true },
            intérprete: { type: String, required: true },
            letra: { type: String } // opcional
        }
    ]
});

module.exports = mongoose.model('edicoes', EdicaoSchema);
