import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        total: Sequelize.DECIMAL,
        itens: Sequelize.ARRAY(Sequelize.JSON),
      },
      {
        sequelize,
      }
    );

    return this
  }

  static associate(models) {
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
      as: 'book',
    });
  }
}

export default Order