// import "../styles/globals.css";
import "../styles/globals.scss";

import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF1cWmhIYVppR2Nbe051flFPal5TVAciSV9jS31SdERjWXpbcHZcQmRZUQ=="
);
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Dynamically import the Kommunicate script on client-side
    if (typeof window !== "undefined") {
      import("@kommunicate/kommunicate-chatbot-plugin").then((Kommunicate) => {
        // Ensure the init function is available
        if (
          Kommunicate &&
          Kommunicate.default &&
          typeof Kommunicate.default.init === "function"
        ) {
          Kommunicate.default.init("39057f680d378c35c27d241e7f183d27a", {
            automaticChatOpenOnNavigation: true,
            popupWidget: true,
          });
        }
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs."
        />
        <link rel="icon" href="./logo.png" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
