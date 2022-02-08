const getTwoFactors = require('../../services/twoFactors/getTwoFactors');

module.exports = async (_, res) => {
	try {
		const twoFactors = await getTwoFactors();
		res.json(twoFactors);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};