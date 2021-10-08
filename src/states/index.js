import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from "./theme"

const rootReducer = {
  isDarkMode: ThemeReducer,
  //add more reducer later
};
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});
export default store;