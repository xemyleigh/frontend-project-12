import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
    name: 'channels',
    initialState: { channels: [], currentChannelId: null },
    reducers: {
        setInitialState(state, { payload }) {
            console.log(payload)
            const { channels, currentChannelId } = payload
            state.channels = channels
            state.currentChannelId = currentChannelId
        }
    }
})

export const { actions } = channelsSlice
export default channelsSlice.reducer