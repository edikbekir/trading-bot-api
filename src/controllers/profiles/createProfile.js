const createProfile = require('../../services/profiles/createProfile');

module.exports = async (req, res) => {
	try {
		const profile = await createProfile(req.body);
		res.json(profile);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};