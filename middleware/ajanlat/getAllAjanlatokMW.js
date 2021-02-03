const requireOption = require('../../config/requireOption');
//az összes ajánlat betöltése
module.exports = function (objectRepository) {
    const AjanlatModel = requireOption(objectRepository, 'AjanlatModel');

    return function (req, res, next) {

        AjanlatModel.find({}, (err, ajanlatok)=> {
            if(err) {
                return next(err);
            }
            res.locals.ajanlatok = ajanlatok;
            return next();
        });
    };
};