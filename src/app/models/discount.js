import Sequelize, { Model } from 'sequelize';

class Discount extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        percentage: Sequelize.DECIMAL,
        expiration: Sequelize.DATE
      },
      {
        sequelize,
      }
    );

    return this
  }
}

export default Discount