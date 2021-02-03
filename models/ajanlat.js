const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Ajanlat = db.model('Ajanlat', {
    nev: String,
    leiras: String,
    ar: Number,
    _elado: {
        type: Schema.Types.ObjectId,
        ref: 'Elado'
    }
});

module.exports = Ajanlat;