import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../../types/dixit.type";
import getTotal from "../../utils/getTotal";

const initialPlayers: Player[] = [];

export const playersSlice = createSlice({
    name: 'players',
    initialState: initialPlayers,
    reducers: {
        addPlayer: (state, action) => {
            const newPlayer = {
                id: crypto.randomUUID(),
                name: action.payload,
                scores: [],
                totalScore: 0
            };
            state.push(newPlayer);
        },
        updateScore: (state, action) => {
            const { playerId, roundIndex, newScore } = action.payload;
            const player = state.find(player => player.id === playerId);
            if (player) {
                player.scores[roundIndex] = newScore;
                player.totalScore = getTotal(player.scores);
            }
        },
        resetScores: (state) => {
            state.forEach(player => {
                player.scores = [];
                player.totalScore = 0;
            });
        },
    },
});

export const { addPlayer, updateScore, resetScores } = playersSlice.actions;

const reducers = {
    players: playersSlice.reducer,
}

export default reducers;