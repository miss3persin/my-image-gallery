import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersApiReducer from './slices/usersApiSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        usersApi: usersApiReducer,
    },
    devTools: true
});

export default store;