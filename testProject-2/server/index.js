/** @format */

const express = require("express");
const cors = require("cors");
const { Sequelize, where } = require("sequelize");
const { DataTypes } = require("sequelize");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	"node_test_project_by_sharpener",
	process.env.db_user,
	process.env.db_password,
	{
		host: "localhost",
		dialect:
			"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
	},
);

// creating connection with the database

const connect = async () => {
	try {
		await sequelize.sync({});
		console.log("connection established successfully with the database");
		app.listen(8080, (error) => {
			if (!error)
				console.log("server is listening on http://localhost:8080");
			else console.log(error.message);
		});
	} catch (error) {
		console.log(error.message);
	}
};

connect();

// model
const Todo = sequelize.define("Todos", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		require: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		require: true,
	},
	currentStatus: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

// create todo
app.post("/todo/createTodo", async (req, res) => {
	try {
		const { name, description } = req.body;
		const createdTodo = await Todo.create({
			name,
			description,
		});
		if (createdTodo) {
			const allTodos = await Todo.findAll();
			return res.send({
				message: "Todo created successfully",
				allTodos,
			});
		} else return res.send({ error: "Todo creation failed" });
	} catch (error) {
		return res.send({ error: error.message });
	}
});

// update the status of the todo
app.patch("/todo/updateTodo/:id", async (req, res) => {
	const { id } = req.params;
	const { currentStatus } = req.body;
	try {
		// finding the todo first
		await Todo.findByPk(id);
		await Todo.update({ currentStatus }, { where: { id } });

		const updatedData = await Todo.findAll();
		return res.send({ message: "Todo updated successfully", updatedData });
	} catch (error) {
		return res.send({ error: error.message });
	}
});

app.get("/todo/getTodo", async (req, res) => {
	try {
		const allTodos = await Todo.findAll();
		return res.send(allTodos);
	} catch (error) {
		return res.send({ error: error.message });
	}
});
