const { resolve } = require('path');

module.exports = {
  dialect: 'sqlite',
  database: 'casa_do_codigo',
  storage: resolve(__dirname, '..', 'database', 'database.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};