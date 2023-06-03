/** @format */

const { DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // Import the sequelize instance

const Candy = sequelize.define("Candy", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Candy;
