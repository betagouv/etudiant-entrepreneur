const system = require('./../system')
const application = require('./../application')
const pepite = require('./../pepite')

exports.configure = (app, options) => {
  app.use('/api/system', system(options))
  app.use('/api/application', application(options))
  app.use('/api/pepite', pepite(options))
}
