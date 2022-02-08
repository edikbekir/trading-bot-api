const sequelize = require('../../sequelize');

module.exports = async body => {
	return await sequelize.models.two_factor.create(body);
};