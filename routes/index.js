module.exports = function (app) {
    var path = require('path');
    var userRouter = require('./user')(app);
    var goodRouter = require('./good')(app);
    var categoryRouter = require('./category')(app);

    app.get('/', function (req, res, next) {
        if (req.session.user_id) {
            res.sendFile(path.resolve(__dirname + '/../public/templates/app.html'));
        } else {
            res.sendFile(path.resolve(__dirname + '/../public/templates/login.html'));
        }
    });

    app.use('/good', goodRouter);
    app.use('/category', categoryRouter);
    app.use('/user', userRouter);

    function errorHandler(err, req, res, next) {
        var errorStatus = err.status || 500;
        var errorMessage = err.message || 'some error';
        var errorObject = {
            error: {
                status: errorStatus,
                message: errorMessage
            }
        };
        res.status(errorStatus).send(errorObject);
    }
    app.use(errorHandler);
};