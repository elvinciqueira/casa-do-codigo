import Sequelize, { Model } from 'sequelize';

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this
  }

  static associate(models) {
    this.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'country'
    })
  }
}

export default State