import { createSlice } from '@reduxjs/toolkit';

export interface wordType {
  word: string;
  alphabet: string[];
  disabled: string[];
  finished: boolean;
}

const initialState: wordType = {
  word: '',
  alphabet: [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'Ą',
    'Ł',
    'Ż',
    'Ź',
    'Ę',
    'Ć',
    'Ó',
    'Ś',
  ],
  disabled: [],
  finished: false,
};

const hangmanGameWordSlice = createSlice({
  name: 'hangmanGameWord',
  initialState,
  reducers: {
    assignWord: (state, action) => {
      state.word = action.payload;
    },
    addDisabled: (state, action) => {
      state.disabled = [...state.disabled, action.payload];
    },
    resetAll: (state) => {
      state.word = '';
      state.disabled = [];
      state.finished = false;
    },
    finishGame: (state) => {
      state.finished = true;
    },
  },
});

export const { assignWord, addDisabled, resetAll, finishGame } =
  hangmanGameWordSlice.actions;

export default hangmanGameWordSlice.reducer;
