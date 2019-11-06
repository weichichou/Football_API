const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db') 

const { Router } = express
const router = new Router()
router.get('/', (request, response) => response.send('Welcome to the homepage!'))



const app = express()
app.use(router)

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Listening on port' + port))
