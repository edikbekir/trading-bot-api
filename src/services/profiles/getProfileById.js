const sequelize = require('../../sequelize');
const TwoFactor = require('../../sequelize/models/two_factor.model');
const Sale = require('../../sequelize/models/sale.model');

module.exports = async params => {
	const profile = sequelize.models.profile.findByPk(params, {
		include: [
			{ model: TwoFactor(sequelize) },
			{ model: Sale(sequelize) }
		]
	});
	return profile;
};