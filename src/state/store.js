import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/auth/authSlice";
import registerSlice from "./reducers/auth/registerSlice";
import rsesourcesSlice from "./reducers/resources/resourcesSlice";
import discussionsSlice from "./reducers/discussion/discussionSLice";
import fetchCountries from "./reducers/country/countrySlice";
import discussionSlice from "./reducers/discussion/discussionDetailsSlice";
import quizLevelSlice from "./reducers/quiz/quizLevelSlice";
import quizSlice from "./reducers/quiz/quizSlice";
import transactionsSlice from "./reducers/account/transactionsSlice";
import countryLevelSlice from "./reducers/country/countryLevelQuizSlice";
const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const combinedReducer = {
  user: persistedReducer,
  register: registerSlice,
  countries: fetchCountries,
  resources: rsesourcesSlice,
  discussions: discussionsSlice,
  discussion: discussionSlice,
  quizLevels: quizLevelSlice,
  quizLevel: quizSlice,
  transactions: transactionsSlice,
  countryQuiz: countryLevelSlice,
};
const middlewares = [];
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});
export const persistor = persistStore(store);
