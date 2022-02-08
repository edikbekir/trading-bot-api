const sequelize = require('../../sequelize');
const Option = require('../../sequelize/models/option.model');

module.exports = async () => {
	const sales = sequelize.models.sale.findAll({
		include: [
			{ model: Option(sequelize) },
		]
	});
	return sales;
};