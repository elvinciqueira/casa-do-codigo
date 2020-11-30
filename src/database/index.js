import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user'

const models = [User];

function createDatabase() {
  init()
  
  function init() {
    const connection = new Sequelize(databaseConfig)

    models
    .map(model => model.init(connection))
    .map(model => model.associate && model.associate(connection.models))
  }
}

export default createDatabase();