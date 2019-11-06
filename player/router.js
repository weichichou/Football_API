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
    // 而且為什麼是放在findByPk這裡呢？
    Player.findByPk(req.params.id, { include: [{
        model: Team,
        include:[City]
    }] })
        .then(player => {
            if(!player){
                res.status(404).end();
            }else{
                //只想印出特定資訊：姓名，隊伍，城市？
                const response = {
                    name: player.name,
                    teamName: player.team.name,
                    cityName: player.team.city.name
                };
                res.json(response);
            }
        })
        .catch(next);
})

router.get('/players/searchByTeam/:teamName', (req, res, next) => {
    Team.findOne({
        where: {name: req.params.teamName}
    }).then(data => Promise.resolve(data.id))
    .then(teamId => {
        Player.findAll({where: {teamId: teamId}})
        .then(list => res.send(list.map(item => ({name: item.name, number: item.number}))))
        .catch(next)
    })

})

module.exports = router