const createSale = require('../../services/sales/createSale');

module.exports = async (req, res) => {
	try {
		const sale = await createSale(req.body);
		res.json(sale);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};