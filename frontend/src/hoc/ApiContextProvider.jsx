import { createContext } from 'react'
import { io } from 'socket.io-client'
import { actions as channelsActions } from '../slices/channelsSlice'
import { actions as messageActions } from '../slices/messagesSlice'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'

export const ApiContext = createContext(null)

const ApiContextProvider = ({ children }) => {
    const socket = io()
    const dispatch = useDispatch()
    const { signOut } = useAuth()

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
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        // if (payload.username === '') {
        //     signOut()
        // }
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



    const subscribeNewMessages = () => {
        socket.on('newMessage', (payload) => {
            const obj = { payload }
            console.log(payload)
            dispatch(messageActions.createNewMessage(obj))
        })
    }

    const sendMessage = (body, channelId, username) => {
        socket.emit('newMessage', { body, channelId, username });
    }

    return (
        <ApiContext.Provider value={{ removeChannel, subscribeNewMessages, sendMessage, addChannel, renameChannel }}>
            { children }    
        </ApiContext.Provider>
    )
}

export default ApiContextProvider