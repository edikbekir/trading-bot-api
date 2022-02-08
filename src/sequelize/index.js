const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const {
	DB_USER,
	DB_NAME,
	DB_PASSWORD,
	DB_HOST,
	DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

const modelDefiners = [
	require('./models/profile.model'),
	require('./models/two_factor.model'),
	require('./models/sale.model'),
	require('./models/sale_profile.model'),
	require('./models/option.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;