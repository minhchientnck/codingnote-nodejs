const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  }
}, { sequelize, modelName: 'role', tableName: 'role', freezeTableName: true });

module.exports = Role;
