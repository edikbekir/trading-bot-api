const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const TwoFactor = sequelize.define('two_factor', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

	TwoFactor.belongsTo(sequelize.models.profile);

	return TwoFactor;
};