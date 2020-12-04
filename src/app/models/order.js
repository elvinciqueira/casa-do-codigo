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
}

export default Order