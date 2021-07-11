const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database-config');
const bcrypt = require('bcrypt');
const Role = require('./role');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
  },
  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
  }
}, { sequelize, modelName: 'user', tableName: 'user_account', freezeTableName: true });

User.belongsTo(Role, {
  foreignKey: 'roleId',
});

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.getDataValue('password'));
};

module.exports = User;
