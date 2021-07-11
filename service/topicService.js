const Topic = require('../model/topic');

module.exports = {
  findById: async (id) => {
    return await Topic.findOne({ where: { id } });
  },
  findByName: async (name) => {
    return await Topic.findOne({ where: { name } });
  },
  findAll: async () => { 
    return await Topic.findAll();
  }
};