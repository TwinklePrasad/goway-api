const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING
    },
     
    password: {
        type: Sequelize.STRING
      },
       
    mobile_number: {
      type: Sequelize.STRING
    }
   
  }
  
)
