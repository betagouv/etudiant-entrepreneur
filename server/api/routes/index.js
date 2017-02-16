const system = require('./../system')
const application = require('./../application')
const committeeAnswer = require('./../committeeAnswer')
const pepite = require('./../pepite')
const region = require('./../region')
const establishment = require('./../establishment')
const user = require('./../user')
const auth = require('./../auth')

exports.configure = (app, options) => {
  app.use('/api/system', system(options))
  app.use('/api/application', application(options))
  app.use('/api/committeeAnswer', committeeAnswer(options))
  app.use('/api/pepite', pepite(options))
  app.use('/api/region', region(options))
  app.use('/api/establishment', establishment(options))
  app.use('/api/user', user(options))
  app.use('/api/auth', auth(options))
}
