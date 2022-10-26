/* eslint-disable no-param-reassign */

import { createSlice, current } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState: { modalType: null, channelId: null },
  reducers: {
    openModal(state, { payload }) {
      const { modalType, id } = payload;
      console.log(payload);
      state.modalType = modalType;
      state.channelId = id;
      console.log(current(state));
    },

    closeModal(state) {
      state.modalType = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
