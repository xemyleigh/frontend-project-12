import { useSelector } from 'react-redux'

const Channel = ({ value, isCurrent }) => {
    console.log(isCurrent)
    return (
        <li className='nav-item w-100'>
            <button className={`w-100 rounded text-start btn ${(isCurrent) ? 'bg-secondary' : null}`}>
                <span className="me-1">#</span>
                {value}
            </button>
        </li>
    )
}

const ChannelsContainer = () => {
    const { channels, currentChannelId } = useSelector(state => state.channels)

    return (
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between align-content-center">
                <span>Каналы</span>
                <button className='btn p-0 border-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                </button>
            </div>
            <div>
                <ul className='nav flex-column nav-pills nav-fill px-2'>
                    {channels.map(({id, name, removable}) => <Channel key={id} value={name} isCurrent={(currentChannelId === id)} />)}
                </ul>
            </div>
        </div>
    )

}

export default ChannelsContainer