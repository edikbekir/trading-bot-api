const sequelize = require('../../sequelize');
const Profile = require('../../sequelize/models/profile.model');

module.exports = async () => {
	const twoFactors = sequelize.models.two_factor.findAll({
		include: [
			{ model: Profile(sequelize) },
		]
	});
	return twoFactors;
};