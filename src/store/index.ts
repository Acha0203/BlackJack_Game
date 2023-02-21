import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import blackjackReducer from './blackjack';

const store = configureStore({
  reducer: {
    blackjack: blackjackReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
