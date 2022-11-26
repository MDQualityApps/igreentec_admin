import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import Routes from './Routes';



function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#7bc54c'
      },
      secondary: {
        main: '#7bc54c',
      }
    },
      typography: {
        fontFamily: [
          'sans-serif',
        ].join(','),
      },
    
  });

  return (
    <ThemeProvider theme={theme}>
      <Router slashType='slash'>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
