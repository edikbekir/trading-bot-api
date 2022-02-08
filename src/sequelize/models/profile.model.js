const TwoFactor = require('./two_factor.model');
const Sale = require('./sale.model');
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Profile = sequelize.define('profile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Profile.hasMany(TwoFactor(sequelize), { foreignKey: 'profileId' });
  Profile.belongsToMany(Sale(sequelize), { through: 'Sales_Profiles'});

  return Profile;
};