const getSaleById = require('../../services/sales/getSaleById');

module.exports = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.json({ message: 'Please provide sale id'});
		res.sendStatus(400);
	}
	try {
		const sale = await getSaleById(id);
		res.json(sale);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};