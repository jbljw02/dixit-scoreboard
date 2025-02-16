import { createSlice } from "@reduxjs/toolkit";

export const targetScoreSlice = createSlice({
    name: 'targetScore',
    initialState: Number(import.meta.env.VITE_TARGET_SCORE),
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