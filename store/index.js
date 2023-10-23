import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import cart from "./cartSlice";
import expandSidebar from "./expandSlice";
import dialog from "./DialogSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const reducers = combineReducers({
  cart,
  expandSidebar,
  dialog,
});

const config = {
  key: "root",
  storage: storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
