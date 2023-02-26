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
  userGameStatus: 'betting',
  ai1GameStatus: 'betting',
  ai2GameStatus: 'betting',
  houseGameStatus: 'waiting',
  userHandScore: 0,
  ai1HandScore: 0,
  ai2HandScore: 0,
  houseHandScore: 0,
  unableStand: false,
  unableHit: false,
  unableSurrender: false,
  unableDouble: false,
  roundResults: [],
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
    setUserGameStatus: (state: { userGameStatus: string }, action: { payload: string }) => {
      state.userGameStatus = action.payload;
    },
    setAi1GameStatus: (state: { ai1GameStatus: string }, action: { payload: string }) => {
      state.ai1GameStatus = action.payload;
    },
    setAi2GameStatus: (state: { ai2GameStatus: string }, action: { payload: string }) => {
      state.ai2GameStatus = action.payload;
    },
    setHouseGameStatus: (state: { houseGameStatus: string }, action: { payload: string }) => {
      state.houseGameStatus = action.payload;
    },
    setUserHandScore: (state: { userHandScore: number }, action: { payload: number }) => {
      state.userHandScore = action.payload;
    },
    setAi1HandScore: (state: { ai1HandScore: number }, action: { payload: number }) => {
      state.ai1HandScore = action.payload;
    },
    setAi2HandScore: (state: { ai2HandScore: number }, action: { payload: number }) => {
      state.ai2HandScore = action.payload;
    },
    setHouseHandScore: (state: { houseHandScore: number }, action: { payload: number }) => {
      state.houseHandScore = action.payload;
    },
    setUnableStand: (state: { unableStand: boolean }, action: { payload: boolean }) => {
      state.unableStand = action.payload;
    },
    setUnableHit: (state: { unableHit: boolean }, action: { payload: boolean }) => {
      state.unableHit = action.payload;
    },
    setUnableSurrender: (state: { unableSurrender: boolean }, action: { payload: boolean }) => {
      state.unableSurrender = action.payload;
    },
    setUnableDouble: (state: { unableDouble: boolean }, action: { payload: boolean }) => {
      state.unableDouble = action.payload;
    },
    setRoundResults: (state: { roundResults: string[] }, action: { payload: string[] }) => {
      state.roundResults = action.payload;
    },
  },
});

export const blackjackActions = blackjackSlice.actions;

export default blackjackSlice.reducer;
