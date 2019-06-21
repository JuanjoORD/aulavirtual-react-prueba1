import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import rootReducer from './rootReducers';

export default function configureStore(initialState, history) {
  const middleware = applyMiddleware(routerMiddleware(history), thunk);

  // redux devtools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedStoreEnhancer = composeEnhancers(
    middleware
  );

  const store = composedStoreEnhancer(createStore)(
    rootReducer, initialState
  );

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(require('./rootReducers'));
    });
  }

  return store;
}
