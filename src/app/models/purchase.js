import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        middle_name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf_cnpj:Sequelize.STRING,
        cellphone: Sequelize.STRING,
        state: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        complement: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
    this.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'country',
    });
  }
}

export default Purchase