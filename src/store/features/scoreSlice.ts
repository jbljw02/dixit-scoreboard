import { createSlice } from "@reduxjs/toolkit";

export const targetScoreSlice = createSlice({
    name: 'targetScore',
    initialState: '30',
    reducers: {
        setTargetScore: (_, action) => {
            return action.payload;
        },
    },
});

export const { setTargetScore } = targetScoreSlice.actions;

const reducers = {
    targetScore: targetScoreSlice.reducer,
}

export default reducers; 