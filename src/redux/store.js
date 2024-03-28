import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import categoriesReducer from './reducers/categories';
import homeReducer from './reducers/home';
import cartReducer from './reducers/cart';
import wishlistReducer from './reducers/wishlist';
import settingsReducer from './reducers/settings';
import paymentReducer from './reducers/payment';
import orderReducer from './reducers/orders';

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    categories: categoriesReducer,
    home: homeReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    settings: settingsReducer,
    payment: paymentReducer,
    orders: orderReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
