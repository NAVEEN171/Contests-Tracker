import { configureStore } from '@reduxjs/toolkit';
import { contestSliceReducer } from './Substores/Contestslice';

export const store = configureStore({
    reducer: {
        contests: contestSliceReducer
    }
});

export default store;