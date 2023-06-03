/** @format */

const { Sequelize } = require("sequelize");
require("dotenv").config();

//  Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	"node_test_project_by_sharpener",
	"root",
	process.env.db_password,
	{
		host: "localhost",
		dialect:
			"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
	},
);

module.exports = sequelize;
