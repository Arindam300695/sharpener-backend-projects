/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	decreseQuanityBy1,
	decreseQuanityBy2,
	decreseQuanityBy3,
	fetchCandy,
} from "./redux/candySlice";
import { ToastContainer, toast } from "react-toastify";

const baseUrl = "http://localhost:8080";

function App() {
	const candies = useSelector((state) => state.candyReducer);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: 0,
		quantity: 0,
	});

	// handleCahnge funciton
	const handleCahnge = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	// handleSubmit funciton
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			!formData.name ||
			!formData.description ||
			!formData.price ||
			!formData.quantity
		)
			return toast.warning("All the fields are required");
		const res = await axios.post(`${baseUrl}/candy/createCandy`, formData);
		if (res.data.error) return toast.error(res.data.error);
		else toast.success(res.data.message);
		dispatch(fetchCandy(res.data.allCandy));
		setFormData({
			name: "",
			description: "",
			price: 0,
			quantity: 0,
		});
	};

	// change qunatity by 1
	const changeQuantityBy1 = async (candyId) => {
		const res = await axios.patch(
			`${baseUrl}/candy/updateCandy/${candyId}`,
			{ quantity: 1 },
		);
		if (res.data.error) return toast.error(res.data.error);
		else toast.success(res.data.message);
		dispatch(decreseQuanityBy1(res.data.newData));
	};

	// change qunatity by 2
	const changeQuantityBy2 = async (candyId) => {
		const res = await axios.patch(
			`${baseUrl}/candy/updateCandy/${candyId}`,
			{ quantity: 2 },
		);
		if (res.data.error) return toast.error(res.data.error);
		else toast.success(res.data.message);
		dispatch(decreseQuanityBy2(res.data.newData));
	};

	// change qunatity by 3
	const changeQuantityBy3 = async (candyId) => {
		const res = await axios.patch(
			`${baseUrl}/candy/updateCandy/${candyId}`,
			{ quantity: 3 },
		);
		if (res.data.error) return toast.error(res.data.error);
		else toast.success(res.data.message);
		dispatch(decreseQuanityBy3(res.data.newData));
	};

	useEffect(() => {
		const fetchCandyData = async () => {
			const res = await axios.get(`${baseUrl}/candy/getCandy`);
			dispatch(fetchCandy(res.data));
		};

		fetchCandyData();

		return () => {};
	}, [dispatch]);

	return (
		<div className="bg-slate-950 w-screen p-4">
			<div className="text-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-5">
				{/* candy name section */}
				<div>
					<label
						htmlFor="candyName"
						className="font-semibold text-white"
					>
						Candy Name:
					</label>
					<input
						value={formData.name}
						id="candyName"
						onChange={handleCahnge}
						name="name"
						type="text"
						placeholder="Candy Name"
						className="border-4  border-emerald-400 focus:outline-none m-4 p-4 rounded-md"
					/>
				</div>
				{/* candy description section */}
				<div>
					<label
						htmlFor="candyDescription"
						className="font-semibold text-white"
					>
						Candy Description:
					</label>
					<input
						value={formData.description}
						id="candyDescription"
						onChange={handleCahnge}
						name="description"
						type="text"
						placeholder="Candy Description"
						className="border-4  border-emerald-400 focus:outline-none m-4 p-4 rounded-md"
					/>
				</div>
				{/* candy price section */}
				<div>
					<label
						htmlFor="candyPrice"
						className="font-semibold text-white"
					>
						Candy Price:
					</label>
					<input
						value={formData.price}
						id="candyPrice"
						onChange={handleCahnge}
						name="price"
						type="number"
						placeholder="Price"
						className="border-4  border-emerald-400 focus:outline-none m-4 p-4 rounded-md"
					/>
				</div>
				{/* cadny quantity secion */}
				<div>
					<label
						htmlFor="candyQuantity"
						className="font-semibold text-white"
					>
						Candy Qauntity:
					</label>
					<input
						value={formData.quantity}
						id="candyQuantity"
						onChange={handleCahnge}
						name="quantity"
						placeholder="Candy Quantity"
						type="number"
						className="border-4  border-emerald-400 focus:outline-none m-4 p-4 rounded-md"
					/>
				</div>
			</div>
			<div className="w-40 m-auto mt-5">
				<button
					className="border-2 border-purple-400 text-black font-semibold rounded-md bg-teal-300 p-3"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>

			<div>
				{candies.length === 0 && (
					<div className="text-white">Loading Data....</div>
				)}

				{candies.length && ( // if there is the candy data
					<div className="container mx-auto">
						<h1 className="text-2xl font-bold mb-4 text-white">
							Candy Shop
						</h1>
						<table className="w-full border-2 border-white">
							<thead>
								<tr>
									<th className="px-4 py-2 text-white">
										Name
									</th>
									<th className="px-4 py-2 text-white">
										Description
									</th>
									<th className="px-4 py-2 text-white">
										Price
									</th>
									<th className="px-4 py-2 text-white">
										Quantity
									</th>
									<th className="px-4 py-2 text-white">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{candies.map((candy) => (
									<tr key={candy.id}>
										<td className="px-4 py- text-white">
											{candy.name}
										</td>
										<td className="px-4 py- text-white">
											{candy.description}
										</td>
										<td className="px-4 py- text-white">
											{candy.price}
										</td>
										<td className="px-4 py- text-white">
											{candy.quantity}
										</td>
										<td className="px-4 py-2">
											<button
												className="bg-gray-500 rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
												onClick={() => {
													changeQuantityBy1(candy.id);
												}}
											>
												Buy 1
											</button>
											<button
												className="bg-gray-500 rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
												onClick={() => {
													changeQuantityBy2(candy.id);
												}}
											>
												Buy 2
											</button>
											<button
												className="bg-gray-500 rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4"
												onClick={() => {
													changeQuantityBy3(candy.id);
												}}
											>
												Buy 3
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
