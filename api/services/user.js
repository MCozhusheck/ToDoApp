const userModel = require('../models/User');

module.exports.create = async (user) => {
    if(!user) {
        throw new Error('Missing user');
    }

    await userModel.create(user);
}