import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import MainTheme from "../styles/MainTheme";
import MainLayout from "../components/Layout/MainLayout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={MainTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
