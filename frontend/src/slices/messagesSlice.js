import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
    name: 'messages',
    initialState: { messages: [] },
    reducers: {
        setInitialState(state, { payload }) {
            const { messages } = payload
            console.log(messages)
            state.messages = messages
        },

        createNewMessage(state, { payload }) {
            const { value, currentChannelId, username } = payload
            console.log(payload)
            state.messages.push({ body: value, channelId: currentChannelId, username})
        }
    }
})

export const { actions } = messagesSlice
export default messagesSlice.reducer