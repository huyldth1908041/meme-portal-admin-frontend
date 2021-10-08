import { createSlice } from '@reduxjs/toolkit';

const initialState = false;
const themeSlice = createSlice({
  initialState,
  name: 'isDarkMode',
  reducers: {
    toggleTheme: (state, action) => {
      return !state;
    },

  },
});

const { actions, reducer } = themeSlice;
export const { toggleTheme } = actions;
export default reducer;