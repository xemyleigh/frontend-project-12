import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
    reducer: {
        channels: channelsSlice,
        messages: messagesSlice,
    }
})