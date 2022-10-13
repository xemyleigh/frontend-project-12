import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';

export default configureStore({
    reducer: {
        channels: channelsSlice,
    }
})