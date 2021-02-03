const renderMW = require('../middleware/renderMW');

const getEladokMW = require('../middleware/elado/getEladokMW');
const getEladoMW = require('../middleware/elado/getEladoMW');
const saveEladoMW = require('../middleware/elado/saveEladoMW');
const deleteEladoMW = require('../middleware/elado/deleteEladoMW');

const getAjanlatokMW = require('../middleware/ajanlat/getAjanlatokMW');
const getAllAjanlatokMW = require('../middleware/ajanlat/getAllAjanlatokMW');
const getAjanlatMW = require('../middleware/ajanlat/getAjanlatMW');
const saveAjanlatMW = require('../middleware/ajanlat/saveAjanlatMW');
const deleteAjanlatMW = require('../middleware/ajanlat/deleteAjanlatMW');

const EladoModel = require('../models/elado');
const AjanlatModel = require('../models/ajanlat');

module.exports = function (app) {
    const objRepo = {
        EladoModel: EladoModel,
        AjanlatModel: AjanlatModel
    };


    //uj elado hozzaadasa
    app.use('/elado/new',
        saveEladoMW(objRepo),
        renderMW(objRepo, 'eladoform'));
    //elado szerkesztese
    app.use('/elado/:eladoid/edit',
        getEladoMW(objRepo),
        saveEladoMW(objRepo),
        renderMW(objRepo, 'eladoform'));
    //elado torlese
    app.get('/elado/:eladoid/delete',
        getEladoMW(objRepo),
        deleteEladoMW(objRepo));
    //egy adott elado ajanlatai
    app.get('/elado/:eladoid/ajanlat',
        getEladoMW(objRepo),
        getAjanlatokMW(objRepo),
        renderMW(objRepo, 'eladoajanlatai'));
    //uj ajanlat hozzaadasa
    app.use('/elado/:eladoid/ajanlat/new',
        getEladoMW(objRepo),
        getAjanlatMW(objRepo),
        saveAjanlatMW(objRepo),
        renderMW(objRepo, 'ajanlatform'));
    //ajanlat szerkesztese
    app.use('/elado/:eladoid/ajanlat/:ajanlatid/edit',
        getEladoMW(objRepo),
        getAjanlatMW(objRepo),
        saveAjanlatMW(objRepo),
        renderMW(objRepo, 'ajanlatform'));
    //ajanlat torlese
    app.get('/elado/:eladoid/ajanlat/:ajanlatid/delete',
        getEladoMW(objRepo),
        getAjanlatMW(objRepo),
        deleteAjanlatMW(objRepo));
    //eladok listaja
    app.get('/elado',
        getEladokMW(objRepo),
        renderMW(objRepo, 'eladolista'));
    //todo ajanlatok listaja
    app.get('/ajanlat',
        getAllAjanlatokMW(objRepo),
        renderMW(objRepo, 'ajanlatlista'));
    //fooldal
    app.get('/',
        renderMW(objRepo, 'index'));
};