const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'blogtest.sqlite'
});

module.exports = sequelize;