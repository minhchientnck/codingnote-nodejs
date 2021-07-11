const { Sequelize } = require('sequelize');
require('dotenv').config();

const isTimeStampsDB = process.env.DB_TIMESTAMPS
  && JSON.parse(process.env.DB_TIMESTAMPS) || false;

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE,
  define: {
    timestamps: isTimeStampsDB,
  },
});

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'codingnote',
//   process.env.DB_USER || 'root',
//   process.env.DB_PASS || '', {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: process.env.DB_DIALECT || 'mysql',
//     define: {
//       timestamps: isTimeStampsDB
//     },
//   });

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
