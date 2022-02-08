const sequelize = require('../../sequelize');

module.exports = async body => {
	const profile = await sequelize.models.profile.create(body);
	return profile;
};