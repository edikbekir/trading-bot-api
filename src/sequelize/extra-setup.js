const applyExtraSetup = sequelize => {
	const { user } = sequelize.models;

	// orchestra.hasMany(instrument);
	// instrument.belongsTo(orchestra);
}

module.exports = { applyExtraSetup };