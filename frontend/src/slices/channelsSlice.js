/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },

    removeChannel(state, { payload }) {
      const { id } = payload;
      const filteredChannels = state.channels.filter((channel) => channel.id !== id);
      state.channels = filteredChannels;
    },

    renameChannel(state, { payload }) {
      const { id, name } = payload;
      const channelToRename = state.channels.find((channel) => channel.id === id);
      channelToRename.name = name;
    },

    setChannel(state, { payload }) {
      const id = payload;
      state.currentChannelId = id;
    },

    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
