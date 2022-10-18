import { createSlice, current } from '@reduxjs/toolkit'
import { actions as channelsActions } from './channelsSlice'
import remove from 'lodash'

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
            state.messages.push(payload)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
            const { id } = payload
            console.log(current(state))
            remove(state.messages, (message) => message.channelId === id )
        })
    }
})

export const { actions } = messagesSlice
export default messagesSlice.reducer