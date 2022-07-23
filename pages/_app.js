import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import MainTheme from "../styles/MainTheme";
import MainLayout from "../components/Layout/MainLayout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={MainTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
