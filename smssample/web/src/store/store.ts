import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
