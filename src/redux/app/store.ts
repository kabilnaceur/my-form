import { configureStore, Store } from "@reduxjs/toolkit";
import { persistReducer, persistStore, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationReducer, {
  ApplicationState,
} from "../features/application/applicationSlice";

export interface RootState {
  application: ApplicationState;
}

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer<ApplicationState>(
  persistConfig,
  applicationReducer
);

const store: Store<RootState> = configureStore({
  reducer: {
    application: persistedUserReducer,
  },
});

const persistor: Persistor = persistStore(store);

export { store, persistor };
