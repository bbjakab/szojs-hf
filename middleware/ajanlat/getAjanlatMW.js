const requireOption = require('../../config/requireOption');

// egy ajanlat betoltese az adatbazisbol, az eredmeny a res.locals.ajanlat-ba toltodik
module.exports = function (objectRepository) {
    const AjanlatModel = requireOption(objectRepository, 'AjanlatModel');

    return function (req, res, next) {
        AjanlatModel.findOne({
                _id: req.params.ajanlatid
            }, (err, ajanlat)=>{
                if(err || !ajanlat) {
                    return next(err);
                }
                res.locals.ajanlat = ajanlat;
                return next();
        });
    };
};