const requireOption = require('../../config/requireOption');

// elado torlese az adatbazisbol, torles utan atiranyit az /elado oldalra
module.exports = function (objectRepository) {
    const AjanlatModel = requireOption(objectRepository, 'AjanlatModel');

    return function (req, res, next) {
        if (typeof res.locals.elado === 'undefined') {
            return next();
        }
        //elado ajanlatainak torlese
        AjanlatModel.find({_elado: res.locals.elado._id}, (err, ajanlatok)=> {
            if(err) {
                return next(err);
            }
            res.locals.ajanlatok = ajanlatok;
            res.locals.ajanlatok.forEach(function (ajanlat) {
                ajanlat.remove((err)=> {
                    if (err) {
                        return next(err);
                    }
                });
            });
        });
        //elado torlese
        res.locals.elado.remove((err)=>{
            if (err) {
                return next(err);
            }

            return res.redirect('/elado');
        });
    };
};