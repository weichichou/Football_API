const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//const db = require('./db')
//const Team = require('./team/model') 
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')
const cityRouter = require('./city/router')

const { Router } = express
const router = new Router()
router.get('/', (request, response) => response.send('Welcome to the homepage!'))


app.use(bodyParser.json())
app.use(router)
app.use(teamRouter)
app.use(playerRouter)
app.use(cityRouter)

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Listening on port' + port))
