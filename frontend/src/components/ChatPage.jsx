import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import useAuth from "../hooks/useAuth"
import ChannelsContainer from "./ChannelsContainer"
import ChatContainer from './ChatContainer'
import axios from "axios"
import { actions as channelsActions } from '../slices/channelsSlice'

const ChatPage = () => {
    const { getAuthHeader } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const requestData = async () => {
                const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() })
                console.log( data )
                dispatch(channelsActions.setInitialState(data))    
            }
            requestData()
        } catch(e) {
            console.log(e)
        }
    }, []) 

    return (
        <div className="row">
            <ChannelsContainer />
            <ChatContainer />
        </div>
    )
}

export default ChatPage