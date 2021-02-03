const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Elado = db.model('Elado', {
    nev: String,
    cim: String,
    tel: String
});

module.exports = Elado;