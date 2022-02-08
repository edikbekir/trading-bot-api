const sequelize = require('../../sequelize');
const Option = require('../../sequelize/models/option.model');

module.exports = async params => {
	const sale = sequelize.models.sale.findByPk(params, {
		include: [
			{ model: Option(sequelize) },
		]
	});
	return sale;
};