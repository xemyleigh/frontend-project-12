/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import remove from 'lodash';
import { actions as channelsActions } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    setInitialState(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },

    createNewMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const { id } = payload;
      remove(state.messages, (message) => message.channelId === id);
    });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
