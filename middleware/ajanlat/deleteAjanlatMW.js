// ajanlat torlese az adatbazisbol, torles utan atiranyit az /ajanlat/:eladoid oldalra
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.locals.ajanlat === 'undefined') {
            return next();
        }
        res.locals.ajanlat.remove((err)=> {
            if (err) {
                return next(err);
            }

            return res.redirect(`/elado/${res.locals.elado._id}/ajanlat`);
        });
    };
};