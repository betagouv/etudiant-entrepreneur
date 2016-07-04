'use strict'

const http = require('http')
const express = require('express')
const routes = require('./routes')
const StandardError = require('standard-error')
const emptylogger = require('bunyan-noop')
const expressBunyanLogger = require('express-bunyan-logger')
const bodyParser = require('body-parser')
const formatError = require('./lib/middlewares/formatError')

module.exports = Server

function Server(options) {
  options = options || {}
  options.port = options.port || 0
  options.logger = options.logger || emptylogger()

  var logger = options.logger
  var app = express()
  app.set('port', options.port)
  app.set('json spaces', 2)
  app.set('logger', logger)
  app.disable('x-powered-by')
  app.use(bodyParser.json())

  app.use(expressBunyanLogger({
    name: 'requests',
    logger: logger
  }))

  app.use((req, res, next) => {
    req.logger = logger
    next()
  })

  routes.configure(app, options)

  if (options.staticPath) app.use(express.static(options.staticPath))

  app.use((req, res, next) => {
    next(new StandardError('no route for URL ' + req.url, { code: 404 }))
  })
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
