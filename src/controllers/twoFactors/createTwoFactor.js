const createTwoFactor = require('../../services/twoFactors/createTwoFactor');

module.exports = async (req, res) => {
	try {
		const twoFactor = await createTwoFactor(req.body);
		res.json(twoFactor);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};