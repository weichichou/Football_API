const { Router } = require('express')
const Player = require('./model')
const Team = require('../team/model')
const City = require('../city/model')

const router = new Router()

router.get('/players', (req, res, next) => {
    Player.findAll()
        .then(list => res.send(list))
        .catch(err => next(err))
})

router.post('/players', (req, res, next)=>{
    Player.create(req.body)
        .then(player => res.json(player))
        .catch(err => next(err))
})

router.get('/players/:id', (req, res, next)=>{
    // UNDERSTAND WHY WE USE { include: [Team] }
    Player.findByPk(req.params.id, { include: [Team] })
        .then(player => {
            if(!player){
                res.status(404).end();
            }else{
                //只想印出特定資訊：姓名，隊伍，城市？
                res.json(player);
            }
        })
        .catch(next);
})

module.exports = router