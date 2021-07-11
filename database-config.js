const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME || 'guidetocode',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    define: {
      timestamps: false
    }
  });

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
