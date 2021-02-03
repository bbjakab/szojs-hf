const requireOption = require('../../config/requireOption');

// egy ajanlat szerkesztese vagy hozzaadasa az adatbazisban
// ha a res.locals.ajanlat ures, akkor hozzaadas, ha nem, akkor szerkesztes
// vegul atiranyit az /ajanlat/:eladoid oldalra
module.exports = function (objectRepository) {
    const AjanlatModel = requireOption(objectRepository, 'AjanlatModel');
    return function (req, res, next) {
        if (
            typeof req.body === 'undefined' ||
            typeof req.body.nev === 'undefined' ||
            typeof req.body.leiras === 'undefined' ||
            typeof req.body.ar === 'undefined' ||
            typeof res.locals.elado === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.ajanlat === 'undefined') {
            res.locals.ajanlat = new AjanlatModel();
        }

        res.locals.ajanlat.nev = req.body.nev;
        res.locals.ajanlat.leiras = req.body.leiras;
        res.locals.ajanlat.ar = req.body.ar;
        res.locals.ajanlat._elado = res.locals.elado._id;

        res.locals.ajanlat.save((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/elado/'+ res.locals.elado._id + '/ajanlat');
        });
    };
};