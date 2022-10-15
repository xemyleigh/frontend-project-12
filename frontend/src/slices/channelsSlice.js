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
        },

        removeChannel(state, { payload }) {
            const id = payload
            console.log(payload)
            const filteredChannels = state.channels.filter(channel => channel.id !== id)
            console.log(filteredChannels)
            state.channels = filteredChannels
        },

        renameChannel(state, { payload }) {
            const { id, body } = payload
            const channelToRename = state.channels.find(channel => channel.id === id)
            channelToRename.body = body
        },

        setChannel(state, { payload }) {
            const id = payload
            state.currentChannelId = id
        },
    }
})

export const { actions } = channelsSlice
export default channelsSlice.reducer