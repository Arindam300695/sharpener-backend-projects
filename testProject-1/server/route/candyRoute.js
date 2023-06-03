/** @format */

const express = require("express");
const {
	createCandyController,
	updateCandyController,
	getCandyController,
} = require("../controllers/candyController");
const candyRouter = express.Router();

candyRouter.post("/createCandy", createCandyController);
candyRouter.patch("/updateCandy/:id", updateCandyController);
candyRouter.get("/getCandy", getCandyController);
module.exports = candyRouter;
