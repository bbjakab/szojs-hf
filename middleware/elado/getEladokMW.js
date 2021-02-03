const requireOption = require('../../config/requireOption');

// az osszes elado betoltese az adatbazisbol, az eredmeny a res.locals.eladok-ba toltodik
module.exports = function (objectRepository) {
    const EladoModel = requireOption(objectRepository, 'EladoModel');

    return function (req, res, next) {
        EladoModel.find({}, (err, eladok)=> {
            if(err) {
                return next(err);
            }
            res.locals.eladok = eladok;
            return next();
        });
    };
};