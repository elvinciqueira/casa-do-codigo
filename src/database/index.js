import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user'
import Category from '../app/models/category';

const models = [User, Category];

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