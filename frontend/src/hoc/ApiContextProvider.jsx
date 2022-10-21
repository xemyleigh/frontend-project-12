import { createContext } from 'react'
import { io } from 'socket.io-client'
import { actions as channelsActions } from '../slices/channelsSlice'
import { actions as messageActions } from '../slices/messagesSlice'
import { useDispatch } from 'react-redux'

export const ApiContext = createContext(null)

const ApiContextProvider = ({ children }) => {
    const socket = io()
    const dispatch = useDispatch()

    const removeChannel = (id) => {
        console.log('!!!!!!', id)
        socket.emit('removeChannel', { id });
    }

    const addChannel = (channelName) => {
        return new Promise((resolve, reject) => {
            socket.emit('newChannel', { name: channelName }, (resp) => resolve(resp.data))
        }) 
    }

    const renameChannel = (id, name) => {
        console.log(id, name)
        socket.emit('renameChannel', { id, name });
    }

    socket.on('newMessage', (payload) => {
        console.log('ПОДПИСКА ОФОРМЕЛНА НА СООБЩЕНИЯ')
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        dispatch(messageActions.createNewMessage(payload))
    })

    socket.on('newChannel', (payload) => {
        dispatch(channelsActions.addChannel(payload)) // { id: 6, name: "new channel", removable: true }
    });

    socket.on('removeChannel', (payload) => {
        console.log(payload); // { id: 6 };
        dispatch(channelsActions.removeChannel(payload))
    });

    socket.on('renameChannel', (payload) => {
        console.log(payload); // { id: 7, name: "new name channel", removable: true }
        dispatch(channelsActions.renameChannel(payload))
    });




    const sendMessage = (body, channelId, username) => {
        socket.emit('newMessage', { body, channelId, username });
    }

    return (
        <ApiContext.Provider value={{ removeChannel, sendMessage, addChannel, renameChannel }}>
            { children }    
        </ApiContext.Provider>
    )
}

export default ApiContextProvider