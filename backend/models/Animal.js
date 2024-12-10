const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    cor: String,
    peso: Number,
    arroba: { type: Number, default: function() { return this.peso / 15; } },
    raca: String,
    dataNascimento: Date,
    localNascimento: String,
    pai: String,
    vacinas: [
        { vacina: String, data: Date }
    ],
    comprado: Boolean,
    vendido: { type: Boolean, default: false },
    dataVenda: Date,
    valorVenda: Number
}, { timestamps: true });

module.exports = mongoose.model('Animal', AnimalSchema);

