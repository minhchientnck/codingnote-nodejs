const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database-config');

class Topic extends Model {}

Topic.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  label: {
    type: DataTypes.TEXT,
  },
  path: {
    type: DataTypes.TEXT,
  },
  icon: {
    type: DataTypes.TEXT,
  }
}, { sequelize, modelName: 'topic', tableName: 'topic', freezeTableName: true });

module.exports = Topic;
