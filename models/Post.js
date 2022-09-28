const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Post = sequelize.define('posts', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	imgUrl: {
		type: DataTypes.STRING,
		allowNull: true
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	timeStamps: true,
});

//Post.sync({force:true});

module.exports = Post;