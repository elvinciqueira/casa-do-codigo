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
    this.belongsTo(models.Discount, {
      foreignKey: 'discount_id',
      as: 'discount',
    });
  }
}

export default Order