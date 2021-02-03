// kirendereli az adatokat template segitsegevel
module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        res.render(viewName);
    }
};