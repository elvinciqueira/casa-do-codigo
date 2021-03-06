import Sequelize, { Model } from 'sequelize';

class Country extends Model {
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
    this.hasMany(models.State, {
      as: 'state',
    });
  }
}

export default Country