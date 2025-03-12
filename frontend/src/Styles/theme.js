// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize this color
    },
    secondary: {
      main: '#dc004e', // Customize this color
    },
    background: {
      default: '#04070b', // Customize this color

    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize this font
  },
});

export default theme;
