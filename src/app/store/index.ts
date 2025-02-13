import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userApi } from "@/shared/api/userApi";
import authReducer from "@/features/UserRegistration/model/authSlice";
import userRegistrationReducer from "@/features/UserRegistration/model/registrationSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Экшены redux‑persist для игнорирования в serializableCheck
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  auth: authReducer,
  userRegistration: userRegistrationReducer,
  [userApi.reducerPath]: userApi.reducer,
});

// Конфигурация persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // сохраняется только auth
};

// Приводим persistedReducer к типу, соответствующему RootState
export type RootState = ReturnType<typeof rootReducer> & { _persist?: unknown };

const persistedReducer = persistReducer(persistConfig, rootReducer) as (
  state: RootState | undefined,
  action: any
) => RootState;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: {
        // Игнорируем экшены redux‑persist для корректной работы
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Игнорируем поле _persist
        ignoredPaths: ["_persist"],
      },
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
