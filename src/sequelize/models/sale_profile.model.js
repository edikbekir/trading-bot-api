const Sale = require('../models/sale.model');
const Profile = require('../models/profile.model');
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
	const Sale_Profile = sequelize.define('Sales_Profiles', {
		selfGranted: DataTypes.BOOLEAN
	});

	sequelize.models.profile.belongsToMany(sequelize.models.sale, { through: Sale_Profile });
	sequelize.models.sale.belongsToMany(sequelize.models.profile, { through: Sale_Profile });

	return Sale_Profile;
};
