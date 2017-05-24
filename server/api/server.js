'use strict'

const http = require('http')
const express = require('express')
const routes = require('./routes')
const StandardError = require('standard-error')
const emptylogger = require('bunyan-blackhole')
const expressBunyanLogger = require('express-bunyan-logger')
const bodyParser = require('body-parser')
const formatError = require('./lib/middlewares/formatError')
const mongoose = require('mongoose')
var passport = require('passport')
const Raven = require('raven')

const config = require('./config')

module.exports = Server

function Server(options) {
  options = options || {}
  options.port = process.env.PORT || options.port || 0
  options.logger = options.logger || emptylogger()
  options.isTest = options.isTest || false

  mongoose.Promise = require('bluebird')
  if (!mongoose.connection.readyState) {
    // Connect to database
    mongoose.connect(config.mongo.uri, config.mongo.options)

    //This callback will be triggered once the connection is successfully established to MongoDB
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + config.mongo.uri) // eslint-disable-line no-console
    })

    //This callback will be triggered after getting disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected from ' + config.mongo.uri) // eslint-disable-line no-console
    })
  }

  Raven.config(config.sentry.dsn).install()

  var logger = options.logger
  var app = express()
  app.set('port', options.port)
  app.set('json spaces', 2)
  app.set('logger', logger)
  app.disable('x-powered-by')

  app.use(Raven.requestHandler())

  app.use(passport.initialize())

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.cors.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length')
    next()
  })

  app.use(expressBunyanLogger({
    name: 'requests',
    logger: logger
  }))

  app.use((req, res, next) => {
    req.logger = logger
    next()
  })

  app.use(bodyParser.json())

  routes.configure(app, options)

  if (options.staticPath) app.use(express.static(options.staticPath))

  app.use((req, res, next) => {
    next(new StandardError('no route for URL ' + req.url, { code: 404 }))
  })

  app.use(Raven.errorHandler())

  app.use(formatError)

  this.getApp = () => app

  var server = http.createServer(app)

  this.start = (onStarted) => {
    server.listen(app.get('port'), function (error) {
      if (error) {
        logger.error({ error: error }, 'Got error while starting server')
        return onStarted(error)
      }
      logger.info({
        event: 'server_started',
        port: app.get('port')
      }, 'Server listening on port', app.get('port'))
      onStarted()
    })
  }

  this.stop = function (onStopped) {
    logger.info({
      event: 'server_stopping'
    }, 'Stopping server')
    server.close(function (error) {
      if (error) {
        logger.error({ error: error }, 'Got error while stopping server')
        return onStopped(error)
      }
      logger.info({
        event: 'server_stopped'
      }, 'server stopped')
      onStopped()
    })
  }
}
