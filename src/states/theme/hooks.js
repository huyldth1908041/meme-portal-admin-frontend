import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { toggleTheme } from './reducer';


export const useThemeState = () => {
  return useSelector(state => state.isDarkMode);
};
//sử lý các events
export const useThemeHandler = () => {
  const dispatch = useDispatch();
  const onToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return { onToggleTheme };
};