import { createSlice } from '@reduxjs/toolkit';
import { CardObj } from '@/types';

const initialBJState = {
  userName: '',
  gameType: 'Blackjack',
  chips: 400,
  bet: 0,
  userHand: [],
  ai1Hand: [],
  ai2Hand: [],
  houseHand: [],
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
    setUserHand: (state: { userHand: CardObj[] }, action: { payload: CardObj[] }) => {
      state.userHand = action.payload;
    },
    setAi1Hand: (state: { ai1Hand: CardObj[] }, action: { payload: CardObj[] }) => {
      state.ai1Hand = action.payload;
    },
    setAi2Hand: (state: { ai2Hand: CardObj[] }, action: { payload: CardObj[] }) => {
      state.ai2Hand = action.payload;
    },
    setHouseHand: (state: { houseHand: CardObj[] }, action: { payload: CardObj[] }) => {
      state.houseHand = action.payload;
    },
  },
});

export const blackjackActions = blackjackSlice.actions;

export default blackjackSlice.reducer;
