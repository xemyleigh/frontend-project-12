import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

const Channel = ({
  value, isCurrent, id, removable,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const removeChannelHandler = (channelId) => () => {
    dispatch(modalActions.openModal({ modalType: 'removeChannel', id: channelId }));
  };

  const renameChannelHandler = (channelId) => () => {
    dispatch(modalActions.openModal({ modalType: 'renameChannel', id: channelId }));
  };

  const channelHandler = (channelId) => () => {
    dispatch(channelsActions.setChannel(channelId));
  };

  return (
    <li className="nav-item w-100 ">
      <div className="d-flex">
        <button type="button" className={`w-100 rounded text-start text-truncate btn ${(isCurrent) ? 'bg-secondary' : null}`} onClick={channelHandler(id)}>
          <span className="me-1">#</span>
          {value}
        </button>
        {removable && (
        <>
          <button type="button" className="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">{t('channels.menu')}</span>
          </button>
          <div className="dropdown-menu">
            <button type="button" className="dropdown-item" href="#" onClick={removeChannelHandler(id)}>{t('channels.remove')}</button>
            <hr className="dropdown-divider" />
            <button type="button" onClick={renameChannelHandler(id)} className="dropdown-item" href="#">{t('channels.rename')}</button>
          </div>
        </>
        )}
      </div>
    </li>
  );
};

const ChannelsContainer = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addChannelHandler = () => {
    dispatch(modalActions.openModal({ modalType: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between align-content-center px-4">
        <span>{t('channels.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={addChannelHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>

        </button>
      </div>
      <div>
        <ul className="nav flex-column nav-pills nav-fill px-2 pt-4">
          {channels.map(({ id, name, removable }) => (
            <Channel
              key={id}
              value={name}
              id={id}
              removable={removable}
              isCurrent={(currentChannelId === id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsContainer;
