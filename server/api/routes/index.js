const system = require('./../system')
const application = require('./../application')

exports.configure = (app, options) => {
  app.use('/api/system', system(options))
  app.use('/api/application', application(options))
}
