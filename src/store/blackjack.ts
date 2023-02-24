import { createSlice } from '@reduxjs/toolkit';

const initialBJState = {
  userName: '',
  gameType: 'Blackjack',
  chips: 400,
  bet: 0,
  showWindow: false,
};

const blackjackSlice = createSlice({
  name: 'blackjack',
  initialState: initialBJState,
  reducers: {
    setUserName: (state: { userName: string }, action: { payload: string }) => {
      state.userName = action.payload;
    },
    setGameType: (state: { gameType: string }, action: { payload: string }) => {
      state.gameType = action.payload;
    },
    addChips: (state: { chips: number }, action: { payload: number }) => {
      state.chips += action.payload;
    },
    subtractChips: (state: { chips: number }, action: { payload: number }) => {
      state.chips -= action.payload;
    },
    addBet: (state: { bet: number }, action: { payload: number }) => {
      state.bet += action.payload;
    },
    resetBet: (state: { bet: number }) => {
      state.bet = 0;
    },
    setShowWindow: (state: { showWindow: boolean }, action: { payload: boolean }) => {
      state.showWindow = action.payload;
    },
  },
});

export const blackjackActions = blackjackSlice.actions;

export default blackjackSlice.reducer;
