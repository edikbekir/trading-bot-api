const getProfileById = require('../../services/profiles/getProfileById');

module.exports = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.json({ message: 'Please provide profile id'});
		res.sendStatus(400);
	}
	try {
		const profile = await getProfileById(id);
		res.json(profile);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};