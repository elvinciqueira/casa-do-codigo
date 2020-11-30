module.exports = {
  database: 'casa_codigo',
  params: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};