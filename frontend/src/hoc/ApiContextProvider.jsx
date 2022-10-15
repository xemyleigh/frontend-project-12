import { createContext } from 'react'
import { io } from 'socket.io-client'

export const ApiContext = createContext(null)

const ApiContextProvider = ({ children }) => {
    const socket = io('http://localhost:5001')

    const removeChannel = (id) => {
        socket.emit('removeChannel', { id });
    }

    const subscribeNewChannels = () => {

    }

    const subscribeNewMessages = (cb) => {
        socket.on('newMessage', cb)
    }

    const sendMessage = (body, channelId, username) => {
        socket.emit('newMessage', { body, channelId, username });
    }

    return (
        <ApiContext.Provider value={{ removeChannel, subscribeNewMessages, sendMessage }}>
            { children }    
        </ApiContext.Provider>
    )
}

export default ApiContextProvider