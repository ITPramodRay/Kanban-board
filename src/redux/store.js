import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import UserReducer from "./reducer/userReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage: storage,

};
const rootReducer = combineReducers({
  taskReducer: UserReducer,

})
const pReducer = persistReducer(persistConfig, rootReducer)
const composeEnhances =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
;
const store = legacy_createStore(pReducer, composeEnhances(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };

