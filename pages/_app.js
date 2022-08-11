import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import MainTheme from "../styles/MainTheme";
import MainLayout from "../components/Layout/MainLayout";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
