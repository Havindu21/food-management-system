import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/mona-sans';
import '@fontsource/roboto';

export const theme = createTheme({
  typography: {
    // fontFamily: "'Mona Sans Variable', 'Poppins', sans-serif",
    fontFamily: "'Roboto', 'Mona Sans Variable', 'Poppins', sans-serif",
  },
});

export const globalPx = { px: { xs: 3, sm: 5, md: 7, lg: 8 } };
