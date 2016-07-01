const system = require('./../system');

exports.configure = (app, options) => {
    app.use('/api/system', system(options))
}