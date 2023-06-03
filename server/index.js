/** @format */

const express = require("express");
const cors = require("cors");
const sequelize = require("./database/db");
const candyRouter = require("./route/candyRoute");

const app = express();

// using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// candy routes
app.use("/candy", candyRouter);
