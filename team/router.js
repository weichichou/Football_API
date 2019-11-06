const { Router } = require('express')
const Team = require('./model')
const City = require('../city/model')

const router = new Router()

router.get('/team', (req, res, next)=> {
    //findAll 就是 select * from Teams
    Team.findAll()
        .then(list => res.send(list))
        .catch(err => next(err))
})

router.post('/team', (req, res, next)=>{
    Team.create(req.body)
        .then(team => res.json(team))
        .catch(err => next(err))
})

router.get('/team/:id', (req, res, next)=>{
    Team.findByPk(req.params.id, { include: [City] })
        .then(team => {
            if(!team){
                res.status(404).end();
            }else{
                res.json(team);
            }
        })
        .catch(next);
})

module.exports = router
