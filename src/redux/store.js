import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import baseApi from './features/baseApi';
import cartSlice from './features/cart/cartSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
        key: 'cart',
        storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice);
const store = configureStore({
        reducer: {
                [baseApi.reducerPath]: baseApi.reducer,
                cart: persistedCartReducer,
        },

        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                        serializableCheck: {
                                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
                }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
