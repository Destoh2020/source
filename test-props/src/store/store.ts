import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';

// This is our default store declaration
// A reducer is a function that takes an action and the current state and returns the new state
// For every slice you add, add it's reducer here so that store tracks them all
export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
