const getSales = require('../../services/sales/getSales');

module.exports = async (req, res) => {
	try {
		const sales = await getSales();
		res.json(sales);
	} catch (error) {
		console.error(error);

		res.sendStatus(500);
	}
};