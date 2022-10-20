import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useApi, useAuth } from '../hooks/useAuth'
import { actions as messageActions } from '../slices/messagesSlice'


const Message = ({ body, channelId, username }) => {
    return (
        <div className="text-break mb-2">
            <b>{username}</b>{`: ${body}`}
        </div>
    )
}

const ChatContainer = () => {

    const [ value, setValue ] = useState('')
    const { sendMessage, subscribeNewMessages } = useApi()
    const { username } = useAuth()

    const messages = useSelector(store => store.messages.messages)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const channels = useSelector(state => state.channels.channels)

    const currentChannel = channels.find(channel => channel.id === currentChannelId)
    const filteredMessage = messages.filter(message => {
        return message.channelId === currentChannelId
    })

    const inputHandler = (e) => {
        setValue(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('USERNAME DURUNG MESSAGE SENDING', username)

        sendMessage(value, currentChannelId, username)
    }


    return (
        <div className="col p-0 h-100">
            <div className='d-flex flex-column' style={{height: 85 + 'vh'}} >
                <div className="bg-light shadow mb-4 p-3">
                    <p className='m-0'># {currentChannel?.name}</p>
                    <span className='text-muted'>MessagesCount</span>
                </div>
                <div className='px-5 overflow-auto'>
                    {filteredMessage.map(({id, body, channelId, username}) => <Message key={id} username={username} channelId={channelId} body={body}/>)}
                </div>
                <div className="mt-auto px-5 py-3">
                    <form className="py-1 border rounded-2" onSubmit={submitHandler}>
                        <div className="input-group has-validation">
                            <input value={value} onChange={inputHandler} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
                            <button type="submit" disabled="" className="btn btn-group-vertical">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                                </svg>
                                <span className="visually-hidden">Отправить</span>
                            </button>
                        </div>                
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer