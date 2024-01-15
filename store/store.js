import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import popupReducer from "./reducers/popupReducer";

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
    const persistConfig = {
      key: "auth",
      storage,
    };
    const persistConfigMenu = {
      key: "menu",
      storage,
    };
    
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedMenuReducer = persistReducer(persistConfigMenu, menuReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    menu: persistedMenuReducer,
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
