const { DataTypes } = require('sequelize');
const Option = require('../models/option.model');

module.exports = sequelize => {
  const Sale = sequelize.define('sale', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
	Sale.belongsToMany(sequelize.models.profile, { through: 'Sales_Profiles'});
	Sale.hasMany(Option(sequelize), { foreignKey: 'saleId' });

	return Sale;
};