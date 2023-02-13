import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index";
import { persistStore } from "redux-persist";

const initialState = {};

export default function configureStore(onCompletion: () => void): any {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const enhancer = compose(applyMiddleware(...middleware));
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store, onCompletion);
  return { persistor, store };
}
