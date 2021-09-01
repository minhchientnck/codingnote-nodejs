const moment = require('moment');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database-config');
const Topic = require('./topic');

class Post extends Model { }

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  referenceId: {
    type: DataTypes.INTEGER,
    field: 'reference_id',
  },
  topicId: {
    type: DataTypes.INTEGER,
    field: 'topic_id',
    allowNull: true,
  },
  title: {
    type: DataTypes.TEXT,
  },
  referenceTitle: {
    type: DataTypes.TEXT,
    field: 'reference_title',
  },
  shortContent: {
    type: DataTypes.TEXT,
    field: 'short_content',
  },
  content: {
    type: DataTypes.TEXT,
    field: 'content',
  },
  createdDate: {
    type: DataTypes.DATE,
    field: 'created_date',
    get: function () {
      return moment.utc(this.getDataValue('createdDate')).format('DD-MM-YYYY')
    }
  },
  updatedDate: {
    type: DataTypes.DATE,
    field: 'updated_date',
    get: function () {
      return moment.utc(this.getDataValue('updatedDate')).format('DD-MM-YYYY')
    }
  }
}, { sequelize, modelName: 'post', tableName: 'post', freezeTableName: true });

Post.belongsTo(Topic, {
  foreignKey: 'topicId',
});

module.exports = Post;