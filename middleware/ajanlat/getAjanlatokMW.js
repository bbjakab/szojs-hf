const requireOption = require('../../config/requireOption');

// az ajanlatok betoltese az adatbazisbol, az eredmeny a res.locals.ajanlatok-ba toltodik
module.exports = function (objectRepository) {
    const AjanlatModel = requireOption(objectRepository, 'AjanlatModel');

    return function (req, res, next) {
        if (res.locals.elado === 'undefined') {
            return next();
        }
        AjanlatModel.find({_elado: res.locals.elado._id}, (err, ajanlatok)=> {
            if(err) {
                return next(err);
            }
            res.locals.ajanlatok = ajanlatok;
            return next();
        });
    };
};