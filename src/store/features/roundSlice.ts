import { createSlice } from "@reduxjs/toolkit";

export const roundsSlice = createSlice({
    name: 'rounds',
    initialState: 6,
    reducers: {
        addRound: (state) => {
            return state + 1;
        },
        resetRounds: (state) => {
            return 6;
        },
        setRounds: (state, action) => {
            return action.payload;
        },
    },
});

export const { addRound, resetRounds, setRounds } = roundsSlice.actions;

const reducers = {
    rounds: roundsSlice.reducer,
}

export default reducers;