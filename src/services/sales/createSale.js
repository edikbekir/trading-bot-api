const sequelize = require('../../sequelize');
const Option = require('../../sequelize/models/option.model');

module.exports = async body => {
	const sale = await sequelize.models.sale.create(body, {
		include: [
			{ model: Option(sequelize) }
		]
	});
	return sale;
};