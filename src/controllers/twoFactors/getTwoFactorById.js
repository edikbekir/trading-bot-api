const getTwoFactorById = require('../../services/twoFactors/getTwoFactorById');

module.exports = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.json({ message: 'Please provide id'});
		res.sendStatus(400);
	}
	try {
		const twoFactor = await getTwoFactorById(id);
		res.json(twoFactor);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};