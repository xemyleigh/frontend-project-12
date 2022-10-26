import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modalInfo: modalSlice,
  },
});
