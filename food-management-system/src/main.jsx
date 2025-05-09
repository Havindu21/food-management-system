import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme/Theme.js';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store.js';
import SuccessMessage  from '../src/Components/SuccessMessage/SuccessMessage';
import  LoadingAnimation  from '../src/Components/LoadingAnimation/LoadingAnimation';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SuccessMessage />
            <LoadingAnimation />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
