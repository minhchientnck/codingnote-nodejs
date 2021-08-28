const { Op } = require("sequelize");
const Post = require('../model/post');
const Topic = require('../model/topic');

module.exports = {
  max: async (col) => {
    return await Post.max(col);
  },
  count: async () => {
    return await Post.count();
  },
  findOne: async (id) => {
    return await Post.findOne({ where: { id } });
  },
  findOneAndTopic: async (id) => {
    return await Post.findOne({ 
      where: { 
        id 
      }, 
      include: Topic,
    });
  },
  findByReferenceTitle: async (referenceTitle) => {
    return await Post.findOne({
      where: {
        referenceTitle,
      },
      include: Topic,
    });
  },
  findByReferenceTitleAndTopic: async (referenceTitle, topicName) => {
    return await Post.findOne({
      where: {
        referenceTitle,
      },
      include: {
        model: Topic,
        where: {
          name: topicName,
        },
      },
    });
  },
  findAll: async () => {
    return await Post.findAll({ include: Topic });
  },
  findByTopicId: async (topicId) => {
    return await Post.findAll({ where: { topicId } });
  },
  findByTopicName: async (topicName) => {
    return await Post.findAll({
      include: {
        model: Topic,
        where: {
          name: topicName,
        },
      },
    });
  },
  findRelativePostAndTopic: async (postId, topicId) => {
    if (!topicId) {
      return await Post.findAll({
        where: {
          id: {
            [Op.ne]: postId
          }
        },
        include: Topic,
        limit: 10,
      });
    }
    return await Post.findAll({
      where: {
        id: {
          [Op.ne]: postId
        }
      },
      include: {
        model: Topic,
        where: {
          id: topicId,
        },
      },
      limit: 10,
    });
  },
  save: (post) => { },
  delete: () => { },
  deleteAll: () => { },
};