import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user'
import Category from '../app/models/category';
import Book from '../app/models/book'

const models = [User, Category, Book];

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