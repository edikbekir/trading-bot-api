const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Option = sequelize.define('option', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

	Option.belongsTo(sequelize.models.sale);

	return Option;
};