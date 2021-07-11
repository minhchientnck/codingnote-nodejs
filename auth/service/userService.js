const User = require('../model/user');

module.exports = {
  findOne: async(username) => {
    return await User.findOne({ where: {
      username,
    }});
  },
  findById: async(id) => {
    return await User.findOne({ where: {
      id,
    }});
  },
};
