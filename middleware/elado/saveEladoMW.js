const requireOption = require('../../config/requireOption');

// egy elado szerkesztese vagy hozzaadasa az adatbazisban
// ha a res.locals.elado ures, akkor hozzaadas, ha nem, akkor szerkesztes
// vegul atiranyit az /elado oldalra

module.exports = function(objectrepository) {
    const EladoModel = requireOption(objectrepository, 'EladoModel');

    return function(req, res, next) {
        if (
            typeof req.body === 'undefined' ||
            typeof req.body.nev === 'undefined' ||
            typeof req.body.cim === 'undefined' ||
            typeof req.body.tel === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.elado === 'undefined') {
            res.locals.elado = new EladoModel();
        }

        res.locals.elado.nev = req.body.nev;
        res.locals.elado.cim = req.body.cim;
        res.locals.elado.tel = req.body.tel;

        res.locals.elado.save((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/elado');
        });
    };
};