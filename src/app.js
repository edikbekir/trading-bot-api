const express = require('express');
const cors = require('cors')
const sequelize = require('./sequelize');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json())

routes(app);

app.listen(PORT, async () => {
	console.log(`Server is running on ${PORT}`);
	try {
		await sequelize.authenticate();
		await sequelize.sync({ force: true });
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
});