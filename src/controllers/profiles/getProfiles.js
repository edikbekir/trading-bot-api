const getProfiles = require('../../services/profiles/getProfiles');

module.exports = async (req, res) => {
	try {
		const profiles = await getProfiles();
		res.json(profiles);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};