import { configureStore, Store } from "@reduxjs/toolkit";
import { persistReducer, persistStore, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationReducer, {
  ApplicationState,
} from "../features/application/applicationSlice";
import formsReducer, { FormsState } from "../features/form/formSlice";

export interface RootState {
  application: ApplicationState;
  forms: FormsState;
}

const persistConfig = {
  key: "root",
  storage,
};

const persistedApplicationReducer = persistReducer<ApplicationState>(
  persistConfig,
  applicationReducer
);
const persistedFormReducer = persistReducer<FormsState>(
  persistConfig,
  formsReducer
);

const store: Store<RootState> = configureStore({
  reducer: {
    application: persistedApplicationReducer,
    forms: persistedFormReducer,
  },
});

const persistor: Persistor = persistStore(store);

export { store, persistor };
