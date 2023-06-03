/** @format */

const Candy = require("../module/candyModule");

// create new candy
const createCandyController = async (req, res) => {
	try {
		const { name, description, price, quantity } = req.body;
		// checking if the candy with same name already exists or not
		const existingCandy = await Candy.findOne({
			where: { name },
		});
		if (existingCandy)
			return res.send({ error: "candy already exists with same name" });
		// if the candy doens't exist then nedd to create and save it in the database
		await Candy.create({
			name,
			description,
			price,
			quantity,
		});
		const allCandy = await Candy.findAll();
		res.send({ message: "candy created successfully", allCandy });
	} catch (error) {
		return res.send({ error: error.message });
	}
};

// update candy quantity
const updateCandyController = async (req, res) => {
	try {
		const { id } = req.params;
		const { quantity } = req.body;
		const convertedQuantity = Number(quantity);

		// let's find the candy first which is supposed to be updated
		const candyToBeUpdated = await Candy.findByPk(id);

		// console.log(candyToBeUpdated.quantity - convertedQuantity);
		const updatedQuantity = candyToBeUpdated.quantity - convertedQuantity;
		if (updatedQuantity > 0) {
			await Candy.update(
				{ quantity: updatedQuantity },
				{ where: { id } },
			);
			const newData = await Candy.findAll();
			return res.send({
				message: "quantity updated successfully",
				newData,
			});
		} else {
			return res.send({
				error: "quantity can't go beyond 0 and become negative",
			});
		}
	} catch (error) {
		return res.send({ error: error.message });
	}
};

// get all candies
const getCandyController = async (req, res) => {
	try {
		const candyData = await Candy.findAll();
		if (!candyData) return res.send({ message: "No candies found" });
		else return res.send(candyData);
	} catch (error) {
		return res.send({ error: error.message });
	}
};

module.exports = {
	createCandyController,
	updateCandyController,
	getCandyController,
};
