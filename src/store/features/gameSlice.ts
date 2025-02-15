import { createSlice } from "@reduxjs/toolkit";

export const isGameStartedSlice = createSlice({
    name: 'isGameStarted',
    initialState: false,
    reducers: {
        setIsGameStarted: (state, action) => {
            return action.payload;
        },
    },
});

export const { setIsGameStarted } = isGameStartedSlice.actions;

const reducers = {
    isGameStarted: isGameStartedSlice.reducer,
}

export default reducers;