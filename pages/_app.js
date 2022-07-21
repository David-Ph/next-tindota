import "../styles/globals.css";
import { ThemeProvider } from '@mui/material/styles';
import MainTheme from "../styles/MainTheme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={MainTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
