import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AppState {
  userId: string;
  baseApiUrl: string;
  isElectron: boolean;
}

const initialState: AppState = {
  userId: '',
  baseApiUrl: 'http://localhost:5000',
  isElectron: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setBaseApiUrl: (state, action: PayloadAction<string>) => {
      state.baseApiUrl = action.payload;
    },
    setElectron: (state, action: PayloadAction<boolean>) => {
      state.isElectron = action.payload;
    },
  },
});

export const { setUserId, setBaseApiUrl, setElectron } = appSlice.actions;

export const baseApiUrl = (state: RootState) => state.app.baseApiUrl;
export const userId = (state: RootState) => state.app.userId;
export const isElectron = (state: RootState) => state.app.isElectron;

export default appSlice.reducer;
