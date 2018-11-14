<<<<<<< HEAD
// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')
// const puppies = require('../data/puppies.json')

// For Fall 2018.......................

const customers = require('../data/customers.json')
const products = require('../data/products.json')
// const orders = require('../data/orders.json')
// const orderLineItems = require('../data/orderLineItems.json')

//........................................................

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  // Customers don't depend on anything else............

  db.customers = new Datastore()
  db.customers.loadDatabase()

  // insert the sample data into our data store
  db.customers.insert(customers)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.customers = db.customers.find(customers)
  LOG.debug(`${app.locals.customers.query.length} customers seeded`)

  // // Products don't depend on anything else ...............

   db.products = new Datastore()
  db.products.loadDatabase()

  // insert the sample data into our data store
  db.products.insert(products)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.products = db.products.find(products)
  LOG.debug(`${app.locals.products.query.length} products seeded`)


  // // Orders need a customer .................................

  // db.orders = new Datastore()
  // db.orders.loadDatabase()

  // // insert the sample data into our data store
  // db.orders.insert(orders)

  // // initialize app.locals (these objects will be available to our controllers)
  // app.locals.orders = db.orders.find(orders)
  // LOG.debug(`${app.locals.orders.query.length} orders seeded`)

  // // Each Order Line Item needs a product and an order...................

  // db.orderLineItems = new Datastore()
  // db.orderLineItems.loadDatabase()

  // // insert the sample data into our data store
  // db.orderLineItems.insert(orderLineItems)

  // // initialize app.locals (these objects will be available to our controllers)
  // app.locals.orderLineItems = db.orderLineItems.find(orderLineItems)
  // LOG.debug(`${app.locals.orderLineItems.query.length} orderLineItems seeded`)

  
  LOG.info('END Seeder. Sample data read and verified.')
}
=======
/**
 * @file app.js
 * The starting point of the application.
 * Express allows us to configure our app and use
 * dependency injection to add it to the http server.
 * 
 * The server-side app starts and begins listening for events.
 *
 */

// Module dependencies
const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')

// Load environment variables from .env file, where API keys and passwords are configured.
// dotenv.load({ path: '.env.example' })
dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')

// app variables
const DEFAULT_PORT = 8089

// create express app ..................................
const app = express()

// configure app.settings.............................
app.set('port', process.env.PORT || DEFAULT_PORT)

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

// configure middleware.....................................................
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(expressStatusMonitor())

// log calls
app.use((req, res, next) => {
  LOG.debug('%s %s', req.method, req.url)
  next()
})

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler()) // load error handler

const routes = require('./routes/index.js')
app.use('/', routes)  // load routing
LOG.info('Loaded routing.')

app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data

// start Express app
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
>>>>>>> dad9f8d981ddf52f4c998cd26bfe7e137067d75d
