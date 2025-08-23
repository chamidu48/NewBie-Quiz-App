import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import questionsReducer from "./slices/question-slice";
import userReducer from "./slices/user-slice";
import subjectsReducer from "./slices/subjects-slice";

// Root reducer combining all slices
const rootReducer = combineReducers({
  questions: questionsReducer,
  user: userReducer,
  subjects: subjectsReducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["questions", "subjects", "user"],
};

// Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor instance
export const persistor = persistStore(store);
export default store;
