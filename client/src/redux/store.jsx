/** @format */

import { configureStore } from "@reduxjs/toolkit";
import candyReducer from "./candySlice";

const store = configureStore({
	reducer: {
		candyReducer,
	},
});

export default store;
