/** @format */

import { createSlice } from "@reduxjs/toolkit";

const candySlice = createSlice({
	name: "candy",
	initialState: [],
	reducers: {
		fetchCandy: (state, action) => {
			return action.payload;
		},
		decreseQuanityBy1: (state, action) => {
			return action.payload;
		},
		decreseQuanityBy2: (state, action) => {
			return action.payload;
		},
		decreseQuanityBy3: (state, action) => {
			return action.payload;
		},
	},
});

export const {
	decreseQuanityBy1,
	fetchCandy,
	decreseQuanityBy2,
	decreseQuanityBy3,
} = candySlice.actions;
export default candySlice.reducer;
