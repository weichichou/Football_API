const Sequelize = require('sequelize')
const db = require('../db')

const City = db.define(
    'city', 
    {
        name: {
            type: Sequelize.STRING,
            field: 'city_name'
        },
        population: {
            type: Sequelize.STRING,
            field: 'city_population'
        }
    },
    { tableName: 'city'}
)

module.exports = City