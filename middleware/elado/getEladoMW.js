const requireOption = require('../../config/requireOption');

// egy elado betoltese az adatbazisbol, az eredmeny a res.locals.elado-ba toltodik
module.exports = function (objectRepository) {
    const EladoModel = requireOption(objectRepository, 'EladoModel');

    return function (req, res, next) {
        EladoModel.findOne({
                _id: req.params.eladoid
            }, (err, elado)=> {
                if(err || !elado) {
                    return next(err);
                }
                res.locals.elado = elado;
                return next();
        });
    };
};