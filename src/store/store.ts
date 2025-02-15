import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { playersSlice } from './features/playerSlice';
import { roundsSlice } from './features/roundSlice';
import { isGameStartedSlice } from './features/gameSlice';
import { targetScoreSlice } from './features/scoreSlice';

const combinedReducer = combineReducers({
  players: playersSlice.reducer,
  rounds: roundsSlice.reducer,
  isGameStarted: isGameStartedSlice.reducer,
  targetScore: targetScoreSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: combinedReducer,
  })
}

const store = makeStore();

// AppStore 타입은 configureStore로 생성된 타입
export type AppStore = ReturnType<typeof makeStore>
// AppDispatch는 스토어의 dispatch 타입
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export default store;