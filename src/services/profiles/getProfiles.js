const sequelize = require('../../sequelize');
const TwoFactor = require('../../sequelize/models/two_factor.model');
const Sale = require('../../sequelize/models/sale.model');

module.exports = async () => {
	const profiles = sequelize.models.profile.findAll({
		include: [
			{ model: TwoFactor(sequelize) },
			{ model: Sale(sequelize) }
		]
	});
	return profiles;
};