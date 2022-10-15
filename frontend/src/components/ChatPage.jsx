import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useAuth } from "../hooks/useAuth"
import ChannelsContainer from "./ChannelsContainer"
import ChatContainer from './ChatContainer'
import axios from "axios"
import { actions as channelsActions } from '../slices/channelsSlice'
import { actions as messagesActions } from "../slices/messagesSlice"

const ChatPage = () => {
    const { getAuthHeader } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const requestData = async () => {
                const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() })
                console.log( data )
                dispatch(channelsActions.setInitialState(data))
                dispatch(messagesActions.setInitialState(data))

            }
            requestData()
        } catch(e) {
            console.log(e)
        }
    }, [dispatch]) 

    return (
        <div className='container my-4 rounded overflow-hidden shadow h-100'>
            <div className="row h-100">
                <ChannelsContainer />
                <ChatContainer />
            </div>
        </div>

    )
}

export default ChatPage