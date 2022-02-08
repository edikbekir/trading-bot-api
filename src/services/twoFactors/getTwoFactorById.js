const sequelize = require('../../sequelize');
const Profile = require('../../sequelize/models/profile.model');

module.exports = async params => {
	const twoFactor = sequelize.models.two_factor.findByPk(params, {
		include: [
			{ model: Profile(sequelize) },
		]
	});
	return twoFactor;
};