import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import loaderReducer from "../reducers/loaderSlice";
import successMessageSlice from "../reducers/successMessageSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "loader",
    "success",
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  success: successMessageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
