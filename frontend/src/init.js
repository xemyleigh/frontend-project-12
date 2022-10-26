/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import store from './slices/index';
import 'react-toastify/dist/ReactToastify.css';
import ApiContext from './hoc/ApiContextProvider';

import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';

import ru from './locales/ru';

const init = () => {
  const socket = io();

  const wrapper = (event, ...args) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject();
    }, 3000);

    socket.emit(event, ...args, (response) => {
      clearTimeout(timerId);
      console.log(response.status);

      if (response.status === 'ok') {
        console.log(response.data);
        resolve(response.data);
      }

      reject();
    });
  });

  const removeChannel = async (id) => {
    await wrapper('removeChannel', { id });
  };

  const addChannel = async (channelName) => {
    const response = await wrapper('newChannel', { name: channelName });
    return response;
  };

  const renameChannel = async (id, name) => {
    console.log(id, name);
    await wrapper('renameChannel', { id, name });
  };

  const sendMessage = async (body, channelId, username) => {
    await wrapper('newMessage', { body, channelId, username });
  };

  socket.on('newMessage', (payload) => {
    console.log('ПОДПИСКА ОФОРМЕЛНА НА СООБЩЕНИЯ');
    console.log(payload);
    store.dispatch(messageActions.createNewMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    console.log(payload);
    store.dispatch(channelsActions.removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    console.log(payload);
    store.dispatch(channelsActions.renameChannel(payload));
  });

  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru,
      },
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: '8139796d83324d14816972951bb70972',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const api = {
    removeChannel, sendMessage, addChannel, renameChannel,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiContext.Provider value={api}>
            <I18nextProvider i18n={i18n}>
              <Router>
                <App />
              </Router>
            </I18nextProvider>
          </ApiContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
