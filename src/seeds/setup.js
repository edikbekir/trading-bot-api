const sequelize = require('../sequelize');
const setup = async () => {
	try {
		const [profile] = await sequelize.models.profile.bulkCreate([
			{
				name: 'First Profile',
				email: 'test@gmail.com',
				password: '123445778'
			},
		]);

		const [sale] = await sequelize.models.sale.bulkCreate([
			{ name: 'NYM' },
		]);

		const [option1, option2] = await sequelize.models.option.bulkCreate([
			{ name: 'Option 1', link: 'https://option-1-nym.com', saleId: sale.id },
			{ name: 'Option 2', link: 'https://option-2-nym.com', saleId: sale.id },
		]);

		await sale.addProfile(profile.id, sale.id, { through: { selfGranted: false }});
		await profile.addSale(sale.id, profile.id, { through: { selfGranted: false }});

		await sequelize.models.two_factor.bulkCreate([
			{
				name: 'First Two Factor',
				code: '123456',
				profileId: profile.id
			},
		]);
	} catch (e) {
		console.error(e);
	}
};

setup();