const Sequelize = require('sequelize')
const db = require('../db')

const Team = db.define(
    'team', 
    {
        name: {
            type: Sequelize.STRING,
            field: 'team_name'
        }
    },
    { tableName: 'football_teams'}

)

module.exports = Team
