import Sequelize, { Model } from 'sequelize';

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        brief: Sequelize.STRING,
        pages: Sequelize.STRING,
        isbn: Sequelize.STRING,
        price: Sequelize.INTEGER,
        summary: Sequelize.STRING,
        date_publication: Sequelize.DATE,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }
}

export default Book