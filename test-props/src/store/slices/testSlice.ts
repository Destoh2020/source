import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TestState {
  name: string;
  someVariable: string;
  someBoolean: boolean;
}

const initialState: TestState = {
  name: '',
  someVariable: '',
  someBoolean: false,
};

// A lsice is a collection of reducer logic and actions
export const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    // We will call this to overwrite the state in the redux store
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSomeVariable: (state, action: PayloadAction<string>) => {
      state.someVariable = action.payload;
    },
    setSomeBoolean: (state, action: PayloadAction<boolean>) => {
      state.someBoolean = action.payload;
    },
  },
});

// Export everything so we can import them from any component that wants to use the store
export const { setName, setSomeVariable, setSomeBoolean } = testSlice.actions;
export const name = (state: RootState) => state.test.name;
export const someVariable = (state: RootState) => state.test.someVariable;
export const someBoolean = (state: RootState) => state.test.someBoolean;

// Export the reducer adn add it to store
export default testSlice.reducer;
