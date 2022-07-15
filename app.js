const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

logger.info('connecting to mongodb')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to mongodb'))
  .catch((err) => logger.error('error connecting to mongodb', err.message))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[Content-Length] :response-time ms'))

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app