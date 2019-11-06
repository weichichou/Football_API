const { Router } = require('express')
const City = require('./model')

const router = new Router()

router.get('/cities', (req, res, next)=> {
    City.findAll()
        .then(list => res.send(list))
        .catch(err => next(err))
})

router.post('/cities', (req, res, next)=>{
    City.create(req.body)
        .then(city => res.json(city))
        .catch(err => next(err))
})

router.get('/cities/:id', (req, res, next)=>{
    City.findByPk(req.params.id)
        .then(city => {
            if(!city){
                res.status(404).end();
            }else{
                res.json(city);
            }
        })
        .catch(next);
})

module.exports = router