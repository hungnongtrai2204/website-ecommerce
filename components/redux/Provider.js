"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store/index";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";

let persitor = persistStore(store);

export function ReduxProvider({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persitor}>
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
