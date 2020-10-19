const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')
const { dirname } = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))
app.use(routes)

app.listen(3030)
