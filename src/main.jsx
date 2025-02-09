import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
        <StrictMode>
                <HelmetProvider>
                        <div>
                                <Provider store={store}>
                                        <PersistGate loading={null} persistor={persistor}>
                                                <RouterProvider router={router} />
                                                <Toaster position="top-center" />
                                        </PersistGate>
                                </Provider>
                        </div>
                </HelmetProvider>
        </StrictMode>,
);
