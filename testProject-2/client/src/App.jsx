/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const baseUrl = "http://localhost:8080";

function App() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});
	const [todoData, setTodoData] = useState([]);
	const [isCompleted, setIscompleted] = useState(false);

	// handleChange function
	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	// addHandler function
	const addHandler = async (event) => {
		event.preventDefault();
		const res = await axios.post(`${baseUrl}/todo/createTodo`, formData);
		setTodoData(res.data.allTodos);
	};

	// updateHandler function
	const updateHandler = async (todoId) => {
		setIscompleted(!isCompleted);
		const res = await axios.patch(`${baseUrl}/todo/updateTodo/${todoId}`, {
			currentStatus: !isCompleted,
		});
		setTodoData(res.data.updatedData);
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(`${baseUrl}/todo/getTodo`);
			setTodoData(res.data);
		};
		fetchData();
		return () => {};
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: "3rem",
				}}
			>
				{/* todo name secion */}
				<div>
					<label htmlFor="todoName">Todo Name: </label>
					<input
						type="text"
						id="todoName"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				{/* todo description section */}
				<div>
					<label htmlFor="todoDescription">Todo Description: </label>
					<input
						type="text"
						id="todoDescription"
						name="description"
						onChange={handleChange}
						value={formData.description}
					/>
				</div>
				<button onClick={addHandler}>Add Item</button>
				{todoData.length === 0 && <>No Data Found...</>}
				{/* incompleted todos will apear here */}
				<h2>Incompleted Todo:</h2>{" "}
				{todoData.length > 0 &&
					todoData.map(
						(todo) =>
							todo.currentStatus === false && (
								<div key={todo.id}>
									<h4>Todo name: {todo.name}</h4>
									<div>
										<h4>
											Todo current Status:{" "}
											{todo.currentStatus === false && (
												<span>false</span>
											)}
										</h4>
										<span>
											<button
												onClick={() => {
													updateHandler(todo.id);
												}}
											>
												Toggle
											</button>
										</span>
									</div>
									<h4>
										Todo description: {todo.description}
									</h4>
								</div>
							),
					)}
				{/* completed todos will appear here */}
				<div style={{ border: "4px solid white", width: "100%" }}></div>
				<h2> Completed Todo:</h2>{" "}
				{todoData.length > 0 &&
					todoData.map(
						(todo) =>
							todo.currentStatus === true && (
								<div key={todo.id}>
									<h4>Todo name: {todo.name}</h4>
									<div>
										<h4>
											Todo current Status:{" "}
											{todo.currentStatus === true && (
												<span>true</span>
											)}
										</h4>
										<span>
											<button
												onClick={() => {
													updateHandler(todo.id);
												}}
											>
												Toggle
											</button>
										</span>
									</div>
									<h4>
										Todo description: {todo.description}
									</h4>
								</div>
							),
					)}
			</div>
		</>
	);
}

export default App;
