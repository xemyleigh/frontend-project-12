import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/modal'
import { Provider } from 'react-redux';
import store from './slices/index'


import i18next from 'i18next'
import ru from './locales/ru';
import { initReactI18next, I18nextProvider } from "react-i18next";


export default () => {

    const i18n = i18next.createInstance()

    i18n
    .use(initReactI18next)
    .init({
        resources: {
        ru
        },
        lng: 'ru',
        fallbackLng: "ru",
    })

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Router>
                    <App />
                </Router>
            </I18nextProvider>
        </Provider>
    )
  }
