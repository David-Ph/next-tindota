import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import MainTheme from "../styles/MainTheme";
import MainLayout from "../components/Layout/MainLayout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={MainTheme}>
        <Provider store={store}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
